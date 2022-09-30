import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { UserStateService } from "@app/core/services/user-state.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { Subscription } from "rxjs";


@Component({
    selector: 'balance',
    templateUrl: './balance.component.html',
    styleUrls: ['./balance.component.scss'],
    host: {
        class: 'w-full'
    }
})

export class BalanceComponent implements OnDestroy, AfterViewInit {

    constructor(private web3Service: Web3AuthService,
                private userStateService: UserStateService,
                private snackService: SnackNotifierService,
                private paymentService: PaymentService) {}

    sub!: Subscription;
    maticBalance: string | undefined = '0';
    tokenBalance: string | undefined = '0';

    @ViewChild('dropdown') dropdown!: ElementRef;
    @Input() mode = 'normal';
    isDropdownOpened = false;

    ngAfterViewInit() {
        if(this.mode === 'small') this.isDropdownOpened = true;
        this.toggle();
        this.sub = this.userStateService.currentUser.subscribe(user => {
            if(user) {
                this.updateBalance();
            }
        })
    }

    onToggleDropdown() {
        if(this.mode != 'small') this.isDropdownOpened = !this.isDropdownOpened;
        this.toggle();
    }

    toggle() {
        if(this.isDropdownOpened) {
            this.dropdown.nativeElement.style.maxHeight = '320px';
        }
        if(!this.isDropdownOpened) {
            this.dropdown.nativeElement.style.maxHeight = '0px';
        }
    }


    updateBalance() {
        this.web3Service.getBalance().then(balance => {
          this.maticBalance = balance;       
        });
        this.web3Service.getTokenBalance().then(balance => {
          this.tokenBalance = balance;
        })
    }

    async onClaim() {
        if(!this.web3Service.isLoggedIn()) {
            this.snackService.open('PLEASE Login')
        }
        const matic = await this.web3Service.getBalance();
        if(!matic || +matic <= 0) {
            this.snackService.open('Insufficient Matic Balance');
            return;
        }
        this.snackService.open('Claiming USDC');
        await this.paymentService.getTokens().then(hash => {
            this.updateBalance();
            this.snackService.open('USDC balance updated');
        }).catch(error => {
            this.snackService.open('Limit exceeded, try later');
            console.log(error);
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

}