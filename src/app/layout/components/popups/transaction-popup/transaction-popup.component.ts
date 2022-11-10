import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { TRANSACTION_TYPE } from "@app/core/models/enums/transaction-type.enum";
import { Subscription } from "rxjs";
import { PopupService } from "../../popup.service";


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

    sub!: Subscription;

    ngOnInit() {
        this.showPopup$();
    }
    
    @Input() asset!: any;
    txType!: string | null;


    showPopup$() {
        this.sub = this.popupService.showTransactionPopup$().subscribe(type => {
            this.txType = type;
        })
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}