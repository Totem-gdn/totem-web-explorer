import { Injectable } from "@angular/core";
import { MatDialog, MatDialogConfig } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { VersionDialogComponent } from "../version-dialog.component";

@Injectable({providedIn: 'root'})

export class VersionDialogService {

  constructor(readonly matDialog: MatDialog,) {}

  openVersionDialog(): Observable<any> {
    const options: MatDialogConfig = {
        disableClose: true,
        panelClass: 'version-dialog-panel',
        //backdropClass: 'blurred-backdrop',
        autoFocus: false
    };
    return this.matDialog.open(VersionDialogComponent, options).afterClosed();
  }

}
