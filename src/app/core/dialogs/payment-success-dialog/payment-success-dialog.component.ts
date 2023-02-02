import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animations } from '@app/core/animations/animations';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { AssetsListenerService } from '@app/core/web3auth/abi/assets-transaction.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'payment-success-dialog',
  templateUrl: './payment-success-dialog.component.html',
  styleUrls: ['./payment-success-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
  animations: Animations.animations
})
export class PaymentSuccessDialogComponent implements OnInit, OnDestroy {

  asset: string = '';
  status: string = '';
  assetName: string = '';
  assetNameMultiple: string = '';
  secondsToClose: number = 35;
  counterToCloseSub: Subscription = new Subscription();
  counterSub: Subscription = new Subscription();
  txFinished: null | 'success' | 'error' = null;

  constructor(
    public dialogRef: MatDialogRef<PaymentSuccessDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {status: string, type: string},
    private assetsListenerService: AssetsListenerService,
    private userStateService: UserStateService,
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
    this.getUserAndListenAssetTx();
    /* setTimeout(() => {
      this.txFinished = 'error';
      this.startCounter(true);
    }, 5000) */
  }

  getUserAndListenAssetTx() {
    this.assetsListenerService.assetTxState.subscribe((state: string | null) => {
      if (state == 'success') {
        /* this.txFinished = 'success';
        this.dialogRef.close(true); */
        console.log('ASSET MINTED, WAIT 5 SEC TO REDIRECT');
        this.startCounterToSuccessClose();
      }
      if (state == 'error') {
        this.txFinished = 'error';
      }
    })
    this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
      if (user) {
        this.assetsListenerService.listenTx(user.wallet!, this.asset);
        this.startCounter();
      }
    })
  }

  startCounter() {
    this.counterSub = timer(1000, 1000).subscribe(() => {
      this.secondsToClose -= 1;
      if (this.secondsToClose == 0) {
        this.counterSub.unsubscribe();
      }
    })
  }

  startCounterToSuccessClose() {
    let count: number = 5;
    this.counterToCloseSub = timer(1000, 1000).subscribe(() => {
      count -= 1;
      if (count == 0) {
        this.txFinished = 'success';
        this.dialogRef.close(true);
      }
    })
  }

  ngOnDestroy(): void {
    this.counterToCloseSub.unsubscribe();
    this.counterSub.unsubscribe();
    this.secondsToClose = 35;
  }

}
