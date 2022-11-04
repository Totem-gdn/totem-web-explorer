import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { TransactionDialogComponent } from "../transaction-dialog.component";

@Injectable({providedIn: 'root'})

export class TransactionDialogService {

  constructor(readonly matDialog: MatDialog) {}

  openTxDialogModal(): Observable<{ matic: boolean, usdc: boolean }> {
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'tx-dialog',
        backdropClass: 'blurred-backdrop',
        data: null,
        autoFocus: false
    };
    return this.matDialog.open(TransactionDialogComponent, options).afterClosed();
  }

}
