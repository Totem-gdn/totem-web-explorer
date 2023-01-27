import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'purchase-success-dialog',
  templateUrl: './purchase-success-dialog.component.html',
  styleUrls: ['./purchase-success-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
})
export class PurchaseSuccessDialogComponent implements OnInit {
  asset: string = '';
  status: string = '';
  assetName: string = '';
  assetNameMultiple: string = '';

  constructor(
    public dialogRef: MatDialogRef<PurchaseSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {status: string, type: string},
  ) {
    this.asset = data.type;
    this.status = data.status;
  }

  ngOnInit() {
    if (this.asset === 'item') {
      this.assetName = 'Item';
      this.assetNameMultiple = 'Items';
    }
    if (this.asset === 'avatar') {
      this.assetName = 'Avatar';
      this.assetNameMultiple = 'Avatars';
    }
    if (this.asset === 'gem') {
      this.assetName = 'Gem';
      this.assetNameMultiple = 'Gems';
    }
  }

}
