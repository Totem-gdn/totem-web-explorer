import { Component, OnDestroy, OnInit } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { AssetInfo, AssetTransation, PaymentInfo } from "@app/core/models/interfaces/asset-info.model";
import { Subject, takeUntil } from "rxjs";
import { PopupService } from "../../../../core/services/states/popup-state.service";


@Component({
    selector: 'transaction-popup',
    templateUrl: './transaction-popup.component.html',
    styleUrls: ['./transaction-popup.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class TransactionPopupComponent implements OnInit, OnDestroy {

    constructor(private popupService: PopupService) {}

    subs = new Subject<void>();
    tokenTransaction?: boolean = false;
    assetTransaction?: AssetTransation;
    
    ngOnInit() {
        this.tokenTransactionPopup$();
        this.assetTransactionPopup$();
    }

    tokenTransactionPopup$() {
        this.popupService.tokenTransaction$
            .pipe(takeUntil(this.subs))
            .subscribe(show => {
                this.tokenTransaction = show;
            })
    }
    assetTransactionPopup$() {
        this.popupService.assetTransaction$
            .pipe(takeUntil(this.subs))
            .subscribe(assetTransaction => {
                this.assetTransaction = assetTransaction;
            })
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}