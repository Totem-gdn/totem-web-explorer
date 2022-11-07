import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animations } from '@app/core/animations/animations';
import { GIVEAWAY_STATUS } from '@app/core/models/enums/token.enum';
import { WelcomeUser } from '@app/core/models/interfaces/welcome-tokens.model';
import { TokenGiveawayService } from '@app/core/services/giveaway/token-giveaway.service';
import { BehaviorSubject, Subscription } from 'rxjs';

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
