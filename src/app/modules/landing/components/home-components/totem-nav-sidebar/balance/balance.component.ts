import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { TransactionsService } from "@app/core/services/crypto/transactions.service";
import { UserStateService } from "@app/core/services/user-state.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { response } from "express";
import { Subscription, take } from "rxjs";


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
                private paymentService: PaymentService,
                private transactionsService: TransactionsService) {}

    sub: Subscription = new Subscription;
    maticBalance: string | undefined = '0';
    tokenBalance: string | undefined = '0';
    try: number = 0;

    @ViewChild('dropdown') dropdown!: ElementRef;
    @Input() mode = 'normal';
    isDropdownOpened = false;

    ngAfterViewInit() {
        if(this.mode === 'small') this.isDropdownOpened = true;
        this.toggle();
        this.sub.add(
          this.userStateService.currentUser.subscribe(user => {
            if(user) {
                this.updateBalance();
            }
          })
        )
        this.transactionsService.getMaticBalanceViaFaucet().subscribe();
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

    async updateBalanceAndGetMatic() {
      await this.web3Service.getBalance().then(balance => {
          if (parseFloat(balance!) > parseFloat(this.maticBalance!)) {
            this.maticBalance = balance;
            this.onClaim();
          } else {
            if (this.try != 10) {
              this.try += 1;
              this.updateBalanceAndGetMatic();
            }
          }
      })
    }

    getMatics() {
      this.sub.add(
        this.transactionsService.getMaticViaFaucet().pipe(take(1)).subscribe({
          next: (response: any) => {
            console.log(response);
            if (response.status == 'Accepted') {
              this.snackService.open('Matic tokens has been sent, wait a few seconds');
              this.updateBalanceAndGetMatic();
            }
          },
          error: (error: any) => {
            console.log(error);
            if (error.statusCode == 403) {
              this.snackService.open('Please Login');
            }
            if (error.statusCode == 500) {
              this.snackService.open('Your authentication token has expired');
            }
            if (error.statusCode == 400) {
              this.snackService.open('You have already received Matic tokens, try again in 24 hours');
            }
          }
        }
        )
      )
    }

    async onClaim() {
        if(!this.web3Service.isLoggedIn()) {
            this.snackService.open('Please Login')
        }
        const matic = await this.web3Service.getBalance();
        if(!matic || +matic <= 0) {
            this.snackService.open('Insufficient Matic Balance');
            this.getMatics();
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
