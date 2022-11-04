import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animations } from '@app/core/animations/animations';
import { PaymentService } from '@app/core/services/crypto/payment.service';
import { TransactionsService } from '@app/core/services/crypto/transactions.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, Subscription, take } from 'rxjs';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { GIVEAWAY_STATUS } from '@app/core/enums/token.enum';
import { TokenGiveawayService } from '@app/core/services/token-giveaway.service';
import { WelcomeUser } from '@app/core/models/welcome-tokens.model';

@Component({
  selector: 'totem-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
  animations: [
    Animations.animations
  ]
})
export class WelcomeDialogComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  slideInterval: any;
  slideStep: 'first' | 'second' | 'third' | 'fourth' = 'first';

  constructor(
    public dialogRef: MatDialogRef<WelcomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private tokenGiveawayService: TokenGiveawayService,
  ) {
    console.log(this.data);
  }

  ngOnInit() {
    this.slideInterval = setInterval(()=>{
      if (this.slideStep == 'first') {
        this.slideStep = 'second';
        return;
      }
      if (this.slideStep == 'second') {
        this.slideStep = 'third';
        return;
      }
      if (this.slideStep == 'third') {
        this.slideStep = 'fourth';
        return;
      }
      if (this.slideStep == 'fourth') {
        this.slideStep = 'first';
        return;
      }
    }, 2400);
  }

  closeWithAccept() {
    this.subs.add(
      this.tokenGiveawayService.setActivity(1).subscribe((response: WelcomeUser) => {
        if (response && response.welcomeTokens == 1) {
          this.dialogRef.close({status: GIVEAWAY_STATUS.ACCEPTED});
          return;
        }
        this.dialogRef.close('default');
      })
    );
  }
  closeWithReject() {
    this.subs.add(
      this.tokenGiveawayService.setActivity(2).subscribe((response: WelcomeUser) => {
        if (response && response.welcomeTokens == 2) {
          this.dialogRef.close({status: GIVEAWAY_STATUS.REJECTED});
          return;
        }
        this.dialogRef.close('default');
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    clearInterval(this.slideInterval);
  }

}
