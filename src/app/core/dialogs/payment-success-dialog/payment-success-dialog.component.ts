import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'payment-success-dialog',
  templateUrl: './payment-success-dialog.component.html',
  styleUrls: ['./payment-success-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
})
export class PaymentSuccessDialogComponent implements OnInit, AfterViewInit {

  asset: string = '';
  status: string = '';
  assetName: string = '';
  assetNameMultiple: string = '';
  secondsToClose: number = 5;
  counterSub: Subscription = new Subscription();

  constructor(
    public dialogRef: MatDialogRef<PaymentSuccessDialogComponent>,
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

  ngAfterViewInit() {
    this.startCounter();
  }

  startCounter() {
    this.counterSub = timer(1000, 1000).subscribe(() => {
      this.secondsToClose -= 1;
      if (this.secondsToClose == 0) {
        this.dialogRef.close(false);
        this.counterSub.unsubscribe();
      }
    })
  }

}
