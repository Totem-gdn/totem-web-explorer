import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { PAYMENT_METHOD } from "@app/core/models/enums/transaction-type.enum";
import { AssetInfo, AssetTransation, IsPaymentInfo, PaymentInfo } from "@app/core/models/interfaces/asset-info.model";
import { TokenBalance } from "@app/core/models/interfaces/token-balance.modle";
import { CryptoUtilsService } from "@app/core/services/crypto/crypto-utils.service";
import { TransferService } from "@app/core/services/crypto/transfer.service";
import { PopupService } from "@app/core/services/states/popup-state.service";
import { BaseStorageService } from "@app/core/services/utils/base-storage.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { Gtag } from "angular-gtag";
import { Subject, takeUntil } from "rxjs";


@Component({
    selector: 'send-asset',
    templateUrl: './send-asset.component.html',
    styleUrls: ['./send-asset.component.scss', '../transaction-popup.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class SendAssetComponent implements OnInit, OnDestroy {

    get paymentMethod() { 
        return this.transferService.paymentMethod;
     }

    constructor(
        private cryptoUtilsService: CryptoUtilsService,
        private popupService: PopupService,
        private web3Service: Web3AuthService,
        private snackService: SnackNotifierService,
        private gtag: Gtag,
        private transferService: TransferService,
    ) {
        this.gtag.event('page_view');
    }

    @Input() set info(info: AssetTransation) {
        
        if(info.type == 'payment') {
            this.paymentInfo = info.paymentInfo;
            if (!this.paymentMethod) {
                this.choosePaymentMethod = true;
                return;
            } else this.choosePaymentMethod = false;
        }

    };

    paymentInfo?: PaymentInfo;

    subs = new Subject<void>();
    choosePaymentMethod: boolean = false;

    balance!: TokenBalance;
    gasFee?: string;

    async ngOnInit() {
        this.balance$();
        const gasFee = await this.cryptoUtilsService.estimateUSDCGasFee(this.paymentInfo?.paymentInfo?.address, this.paymentInfo?.paymentInfo?.price);
        this.gasFee = gasFee;
    }

    balance$() {
        this.cryptoUtilsService.updateBalance();
        this.cryptoUtilsService.tokenBalance$
            .pipe(takeUntil(this.subs))
            .subscribe(balance => {
                this.balance = balance;
            })
    }

    onClose() {
        this.popupService.closeAssetTransaction();
    }

    onContinue() {
        this.choosePaymentMethod = false;
    }

    async onBuy(type?: ASSET_TYPE, address?: string, price?: string) {
        if(!type || !address || !price) return;

        const [maticBalance, usdcBalance] = await Promise.all([
            this.web3Service.getBalance(),
            this.cryptoUtilsService.getUSDCBalance()
        ])

        if (+usdcBalance < +price) {
            this.snackService.open('Insufficient USDC balance');
            return;
        }

        const usdcGasFee = await this.cryptoUtilsService.estimateUSDCGasFee(address, price);

        if (!maticBalance || +maticBalance <= 0 || +maticBalance < +usdcGasFee!) {
            this.snackService.open('Insufficient MATIC balance');
            return;
        }
        if (usdcBalance == '0' || +usdcBalance < +price) {
            this.snackService.open('Insufficient USDC balance');
            return;
        }

        this.gtag.event(`${type}_purchase`, {
            'event_label': `Click on Generate ${type}`,
        });
        this.popupService.closeAssetTransaction();
        this.snackService.open('Processing transaction')

        this.transferService.transferUSDC(address, price).then(res => {
            this.snackService.open('Your Totem Asset has been created successfully');
            this.cryptoUtilsService.updateBalance();
        })
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}