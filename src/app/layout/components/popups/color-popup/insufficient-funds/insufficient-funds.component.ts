import { Component, OnDestroy } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { CryptoUtilsService } from "@app/core/services/crypto/crypto-utils.service";
import { PopupService } from "@app/core/services/states/popup-state.service";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { Gtag } from "angular-gtag";
import { Observable, Subscription } from "rxjs";
import { TransactionDialogComponent } from "../../dialogs/transaction-dialog/transaction-dialog.component";


@Component({
    selector: 'insufficient-funds',
    templateUrl: './insufficient-funds.component.html',
    styleUrls: ['../color-popup.component.scss', './insufficient-funds.component.scss']
})

export class InsufficientFundsComponent implements OnDestroy {
    constructor(
        private popupService: PopupService,
        private cryptoUtilsService: CryptoUtilsService,
        readonly matDialog: MatDialog,
        private web3Service: Web3AuthService,
        private snackService: SnackNotifierService,
        private gtag: Gtag) { }

    sub?: Subscription;

    onClaim() {
        if (!this.web3Service.isLoggedIn()) {
            this.snackService.open('Please Login');
            this.gtag.event('token_claim', {
                'event_label': 'Claim when user is not login',
            });
            return;
        }
        this.gtag.event('token_claim', {
            'event_label': 'Claim token',
        });
        this.openTxDialog({});
    }

    openTxDialog(data: any) {
        this.sub = this.openTxDialogModal(data).subscribe((data: { matic: boolean, usdc: boolean }) => {
            this.popupService.closeColorPopup();
            if (data.matic || data.usdc) {
                this.updateBalance();
                this.snackService.open('USDC balance updated');
            }

        })
    }

    openTxDialogModal(data: any): Observable<{ matic: boolean, usdc: boolean }> {
        /* const dialogType: string = type == 'cover' || 'gallery' ? 'large-dialog' : 'small-dialog';
        const aspectRation: number = type == 'cover' ? 3.5/1 : type == 'search' ? 1/1 : type == 'gallery' ? 1.78/1 : 1.33/1; */
        const options: MatDialogConfig = {
            disableClose: true,
            panelClass: 'tx-dialog',
            backdropClass: 'blurred-backdrop',
            data: null,
            autoFocus: false
        };
        return this.matDialog.open(TransactionDialogComponent, options).afterClosed();
    }

    updateBalance() {
        console.log('update balance')
        this.cryptoUtilsService.updateBalance();
    }


    closePopup() {
        this.popupService.closeColorPopup();
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}