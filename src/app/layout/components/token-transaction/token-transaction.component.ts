import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { UserStateService } from "@app/core/services/auth.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { Subscription, take, takeUntil, takeWhile } from "rxjs";
import { TokenTransactionService } from "./token-transaction.service";

@Component({
    selector: 'token-transaction',
    templateUrl: './token-transaction.component.html',
    styleUrls: ['./token-transaction.component.scss'],
})

export class TokenTransactionComponent implements OnInit, OnDestroy {

    constructor(private txService: TokenTransactionService,
        private web3Service: Web3AuthService,
        private authService: UserStateService,
        private snackService: SnackNotifierService,
        private paymentService: PaymentService,
        private showPopupService: TokenTransactionService) { }

    showPopup = true;
    sub!: Subscription;
    @ViewChild('suffix') suffix!: ElementRef;

    menuItems: any = [{ title: 'USDC', value: '0' }, { title: 'MATIC', value: '0' }]
    selectedToken: any;

    transferForm = new FormGroup({
        address: new FormControl(null),
        amount: new FormControl(null)
    })

    ngOnInit() {
        this.updateBalance();
        this.showPopupService.showPopup$().subscribe(show => {
            this.showPopup = show;
        })
    }

    onSelectToken(e: any) {
        this.selectedToken = e;
    }

    onInputChange(e: any) {
        const textLength = e.target.value.length;
        this.suffix.nativeElement.style.marginLeft = `${25 + (textLength * 8.8)}px`
    }

    onClose() {
        this.showPopup = false;
    }

    async onTransfer() {
        const address = this.transferForm.get('address')?.value;
        const amount = this.transferForm.get('amount')?.value;

        const matic = await this.web3Service.getBalance();
        const usdc = await this.web3Service.getTokenBalance();

        if(!address || !amount) return;
        if (!matic || +matic <= 0) {
            this.snackService.open('Insufficient MATIC balance');
            return;
        }
        if (!usdc || +usdc <= 0) {
            this.snackService.open('Insufficient USDC balance');
            return;
        }

        this.snackService.open('Your transaction has been sent');
        if(this.selectedToken.title =='USDC') {
            console.log('send usdc')
            this.paymentService.sendUSDC(address, amount).then(res => {
                this.snackService.open('Success');
                this.updateBalance();
            })
        }
        if(this.selectedToken.title == 'MATIC') {
            console.log('send matic')
            this.paymentService.transferMatic(address, amount).then(res => {
                this.snackService.open('Succeess');
                this.updateBalance();
            })
        }
    }

    updateBalance() {
        this.sub = this.authService.currentUser.pipe(takeWhile(val => !val, true)).subscribe(user => {
            console.log('user', user);
            if (user) {
                this.web3Service.getBalance().then(balance => {
                    this.menuItems[1].value = balance;
                    console.log(balance)
                    console.log('menu items', this.menuItems);
                });
                this.web3Service.getTokenBalance().then(balance => {
                    this.menuItems[0].value = balance;
                })
            }
        })
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}