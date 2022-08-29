import { Injectable } from '@angular/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackNotifierComponent } from './snack-bar-notifier.component';

@Injectable()
export class SnackNotifierService {

    constructor(
        private snackbar: MatSnackBar,
    ) {
    }

    open(config?: string) {
        this.snackbar.openFromComponent(SnackNotifierComponent, {
            data: config ? config : undefined,
            verticalPosition: 'bottom',
            horizontalPosition: 'right',
            panelClass: 'totem-snackbar',
            duration: 4000
        })
    }
}
