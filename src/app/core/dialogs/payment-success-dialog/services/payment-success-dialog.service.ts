import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { PaymentSuccessDialogComponent } from "../payment-success-dialog.component";

@Injectable({providedIn: 'root'})

export class PaymentSuccessDialogService {

  constructor(readonly matDialog: MatDialog,) {}

  openPaymentSuccessDialog(status: string, type: string): Observable<any> {
    const options: MatDialogConfig = {
      disableClose: true,
      panelClass: 'payment-dialog-panel',
      data: {
        status: status,
        type: type
      },
      autoFocus: false
  };
    return this.matDialog.open(PaymentSuccessDialogComponent, options).afterClosed();
  }

}
