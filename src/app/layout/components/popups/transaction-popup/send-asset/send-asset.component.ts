import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { TokenBalance } from "@app/core/models/interfaces/token-balance.modle";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { PaymentService } from "@app/core/services/crypto/payment.service";
import { PopupService } from "@app/layout/components/popup.service";
import { environment } from "@env/environment";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'send-asset',
    templateUrl: './send-asset.component.html',
    styleUrls: ['./send-asset.component.scss', '../transaction-popup.component.scss']
})

export class SendAssetComponent implements OnInit, OnDestroy {

    constructor(private assetsService: AssetsService,
                private paymentService: PaymentService,
                private popupService: PopupService) { }

    @Input() asset!: AssetInfo | undefined;
    subs = new Subject<void>();

    balance!: TokenBalance;
    gasFee!: string;

    ngOnInit() {
        this.balance$();
    }

    balance$() {
        this.paymentService.updateBalance();
        this.paymentService.tokenBalance$
        .pipe(takeUntil(this.subs))
        .subscribe(balance => {
            this.balance = balance;
        })
    }

    onClose() {
        this.popupService.closeAssetTransaction();
    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}