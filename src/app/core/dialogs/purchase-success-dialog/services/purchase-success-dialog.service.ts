import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { PurchaseSuccessDialogComponent } from "../purchase-success-dialog.component";

@Injectable({providedIn: 'root'})

export class PurchaseSuccessDialogService {

  constructor(readonly matDialog: MatDialog,) {}

  openPurchaseSuccessDialog(status: string, type: string): Observable<any> {
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'payment-dialog-panel',
        //backdropClass: 'blurred-backdrop',
        data: {
          status: status,
          type: type
        },
        autoFocus: false
    };
    return this.matDialog.open(PurchaseSuccessDialogComponent, options).afterClosed();
  }

}
