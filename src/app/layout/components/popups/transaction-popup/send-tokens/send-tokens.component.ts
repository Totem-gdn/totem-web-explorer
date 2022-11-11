import { Component, EventEmitter, OnDestroy, OnInit, Output } from "@angular/core";
import { FormGroup, FormControl, Validators, FormControlStatus } from "@angular/forms";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { TOKEN } from "@app/core/models/enums/token.enum";
import { TRANSACTION_TYPE } from "@app/core/models/enums/transaction-type.enum";
import { UserStateService } from "@app/core/services/auth.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { PopupService } from "@app/layout/components/popup.service";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { Gtag } from "angular-gtag";
import { BehaviorSubject } from "rxjs";
import { debounceTime, takeWhile } from "rxjs";

interface TokenBalance {
    title: string | undefined;
    value: string | undefined;
}

@Component({
    selector: 'send-tokens',
    templateUrl: './send-tokens.component.html',
    styleUrls: ['./send-tokens.component.scss', '../transaction-popup.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class SendTokensComponent extends OnDestroyMixin implements OnInit, OnDestroy {

    constructor(
        private web3Service: Web3AuthService,
        private authService: UserStateService,
        private snackService: SnackNotifierService,
        private paymentService: PaymentService,
        private showPopupService: PopupService,
        private gtag: Gtag
    ) {
        super()
    }

    get amount() { return this.transferForm.get('amount')?.value };
    get addressTouched() {
        const address = this.transferForm.get('address')
        return (!address?.touched || !address?.dirty);
    }

    addressValid = true;
    maskForAmount: string = '';
    ammountError: BehaviorSubject<boolean> = new BehaviorSubject(false);
    
    menuItems: TokenBalance[] = [{ title: 'USDC', value: '0' }, { title: 'MATIC', value: '0' }];

    selectedToken: any;
    gasFee: string | number | undefined;

    transferForm = new FormGroup({
        address: new FormControl(null, Validators.required),
        amount: new FormControl()
    })

    ngOnInit() {
        this.updateBalance();
    }

    onSelectToken(e: { title: TOKEN, value: string }): void {
        this.selectedToken = e;
        this.gasFee = undefined;
        this.transferForm.get('amount')?.patchValue(null);
        this.transferForm.get('amount')?.setValidators(Validators.max(Number(e.value)));
        this.transferForm.get('amount')?.statusChanges.pipe(
            untilComponentDestroyed(this),
        ).subscribe((status: FormControlStatus) => {
            this.ammountError.next(status === "INVALID" ? true : false)
        })

        this.transferForm.get('amount')?.valueChanges.pipe(
            untilComponentDestroyed(this),
            debounceTime(500),
        ).subscribe(() => {
            this.estimateGas(this.selectedToken.title, this.selectedToken.value);
        })

        this.setMaskForAmount(e.title);
    }

    private async setMaskForAmount(token: TOKEN) {
        const decimals = await this.paymentService.getDecimals(token)
        this.maskForAmount = `separator.${decimals}`;
    }

    onInputChange(e: any) {
        const textLength = e.target.value.length;
    }

    async onClickMax() {
        let value = this.selectedToken.value;
        this.transferForm.get('amount')?.patchValue(value);
        const estimate = await this.estimateGas(this.selectedToken.title, value);

        if (this.selectedToken.title == 'MATIC') {
            if (!estimate) return;
            value -= +estimate;
        }
        this.transferForm.get('amount')?.patchValue(value)
    }

    onClose() {
        this.resetForm();
        this.showPopupService.closeTokenTransaction();
    }

    async estimateGas(tokenTitle: string, value: string) {
        const address = this.transferForm.get('address')?.value;
        if (!address) return;
        if (tokenTitle == 'USDC') this.gasFee = await this.paymentService.estimateUSDCGasFee(address, value);
        if (tokenTitle == 'MATIC') this.gasFee = await this.paymentService.estimateMaticGasFee(address, +value);
        return this.gasFee;
    }

    async isAddressValid() {
        const address = this.transferForm.get('address')?.value;
        const isValid = await this.paymentService.checkAddressValidity(address);
        this.addressValid = !!isValid;
    }

    async onTransfer() {
        const address = this.transferForm.get('address')?.value;
        const amount = this.transferForm.get('amount')?.value;

        // Check address validity
        const isAddressValid = await this.paymentService.checkAddressValidity(address);
        if (!isAddressValid && isAddressValid) {
            this.addressValid = true;
            return;
        }

        const matic = await this.web3Service.getBalance();

        if (!address || !amount) return;
        if (!matic || +matic <= 0) {
            this.snackService.open('Insufficient MATIC balance');
            return;
        }

        this.snackService.open('Your transaction has been sent');

        if (this.selectedToken.title == 'USDC') {
            this.paymentService.sendUSDC(address, amount).then(res => {
                this.snackService.open(`Your ${amount} ${this.selectedToken.title} token(s) have been transferred successfully.`);
                this.gtag.event('send', {
                    'event_label': 'USDC transaction has been sent',
                });
                this.updateBalance();
            }).catch(() => {
                this.snackService.open('Error')
            })
        }
        if (this.selectedToken.title == 'MATIC') {
            const amountToSend = Number(amount) + Number(this.gasFee);
            this.paymentService.transferMatic(address, amountToSend).then(res => {
                this.snackService.open(`Your ${amount} ${this.selectedToken.title} token(s) have been transferred successfully.`);
                this.gtag.event('send', {
                    'event_label': 'MATIC transaction has been sent',
                });
                this.updateBalance();
            })
        }
        this.onClose();
    }

    updateBalance() {
        this.paymentService.updateBalance();
        this.authService.currentUser.pipe(
            untilComponentDestroyed(this),
            takeWhile(val => !val, true),
        ).subscribe(user => {
            if (user) {
                this.web3Service.getBalance().then(balance => {
                    this.menuItems[1].value = balance;
                });
                this.web3Service.getTokenBalance().then(balance => {
                    this.menuItems[0].value = balance;
                })
            }
        })
    }

    private resetForm(): void {
        this.transferForm.reset();
        this.gasFee = undefined;
    }
}