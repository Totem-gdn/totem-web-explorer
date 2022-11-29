import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { TokenBalance } from "@app/core/models/interfaces/token-balance.modle";
import { CryptoUtilsService } from "@app/core/services/crypto/crypto-utils.service";
import { PopupService } from "@app/layout/components/popup.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'send-asset',
    templateUrl: './send-asset.component.html',
    styleUrls: ['./send-asset.component.scss', '../transaction-popup.component.scss']
})

export class SendAssetComponent implements OnInit, OnDestroy {

    constructor(
        private cryptoUtilsService: CryptoUtilsService,
        private popupService: PopupService
    ) { }

    @Input() asset!: AssetInfo | undefined;
    subs = new Subject<void>();

    balance!: TokenBalance;
    gasFee!: string;

    ngOnInit() {
        this.balance$();
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

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }
}