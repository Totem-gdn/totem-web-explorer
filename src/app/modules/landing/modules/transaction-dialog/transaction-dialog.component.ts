import { HttpEventType } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Animations } from '@app/core/animations/animations';
import { ImagesToUpload, SubmitGameResponse } from '@app/core/models/submit-game-interface.model';
import { TransactionsService } from '@app/core/services/crypto/transactions.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { ImageCroppedEvent, LoadedImage, base64ToFile } from 'ngx-image-cropper';
import { BehaviorSubject, concat, Observable, Subscription, take } from 'rxjs';
import { SnackNotifierService } from '../snack-bar-notifier/snack-bar-notifier.service';

@Component({
  selector: 'totem-transaction-dialog',
  templateUrl: './transaction-dialog.component.html',
  styleUrls: ['./transaction-dialog.component.scss'],
  host: {
        class: 'flex flex-auto w-full h-full'
  },
  animations: [
    Animations.animations
  ]
})
export class TransactionDialogComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  tokensClaimed: { matic: boolean, usdc: boolean } = { matic: false, usdc: false } ;
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  steps: any = [
    {
      step: false,
      loading: false,
    },
    {
      step: false,
      loading: true,
    },
    {
      step: false,
      loading: false,
    },
    {
      step: false,
      loading: false,
    },
  ];
  stepIndex: number = 1;
  maticHash: string | null = null;
  usdcHash: string | null = null;

  errorMessage: string = '';
  errorState: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<TransactionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private web3Service: Web3AuthService,
    private snackService: SnackNotifierService,
    private transactionsService: TransactionsService,
    ) {
      console.log(this.data);

    }

  ngOnInit() {
    this.subs.add(
      this.web3Service.maticTransactionListener().subscribe((data: any) => {
        if (data == 'error') {
          //this.disableButton = false;
          //this.snackService.open('There was an error while processing your request.');
          this.errorMessage = 'There was an error while processing your request.';
          this.errorState = true;
        }
        if (data && data != 'error') {
          if (!data.status) {
            //this.disableButton = false;
            //this.snackService.open('There was an error while processing your request.');
            this.errorMessage = 'There was an error while processing your request.';
            this.errorState = true;
            return;
          }
          this.tokensClaimed.matic = true;
          if (this.tokensClaimed.usdc) {
            this.nextStep();
          }
          //this.disableButton = false;
        }
      })
    );
    this.subs.add(
      this.web3Service.usdcTransactionListener().subscribe((data: any) => {
        if (data == 'error') {
          //this.disableButton = false;
          //this.snackService.open('There was an error while processing your request.');
          this.errorMessage = 'There was an error while processing your request.';
          this.errorState = true;
        }
        if (data && data != 'error') {
          if (!data.status) {
            //this.disableButton = false;
            //this.snackService.open('There was an error while processing your request.');
            this.errorMessage = 'There was an error while processing your request.';
            this.errorState = true;
            return;
          }
          this.tokensClaimed.usdc = true;
          if (this.tokensClaimed.matic) {
            //this.snackService.open('USDC balance updated');
            this.nextStep();
          }
          //this.updateBalance();
          //this.snackService.open('USDC balance updated');
          //this.disableButton = false;
        }
      })
    );

    this.getMatics();
    /* let i: number = 0;
    setInterval(()=>{
      this.steps[i].step = true;
      this.steps[i].loading = false;
      this.steps[i+1].loading = true;
      i++;
    }, 2000) */
  }

  isEqual(step: number, index: number): boolean {
    return step === index;
  }

  nextStep() {
    if (this.stepIndex < 3) {
      this.steps[this.stepIndex].step = true;
      this.steps[this.stepIndex].loading = false;
      this.steps[this.stepIndex + 1].loading = true;
      this.stepIndex++;
    }
    if (this.stepIndex == 3) {
      this.steps[this.stepIndex].step = true;
      this.steps[this.stepIndex].loading = false;
    }
    console.log(this.stepIndex, 'CALLED');

  }

  getMatics() {
    //this.nextStep();
    this.subs.add(
      this.transactionsService.getMaticViaFaucet().pipe(take(1)).subscribe({
        next: (response: any) => {
          console.log(response);
          if (response.status == 'Accepted') {

            this.snackService.open('Tokens has been sent, wait a few seconds');

            this.nextStep();
            this.maticHash = response.matic;
            this.usdcHash = response.usdc;

            this.web3Service.isReceiptedMatic(response.matic);
            setTimeout(() => {
              this.web3Service.isReceiptedUsdc(response.usdc);
            }, 400);

          }
        },
        error: (error: any) => {
          console.log(error);
          if (error.error.statusCode == 403) {
            this.snackService.open('Please Login');
          }
          if (error.error.statusCode == 500) {
            //this.snackService.open('Your authentication token has expired');
            this.errorMessage = 'Your authentication token has expired. Please relogin.';
            this.errorState = true;
          }
          if (error.error.statusCode == 400) {
            //this.dialogRef.close({matic: true, usdc: true})
            this.errorMessage = 'You have already claimed the tokens recently. Please try again\n after 24 hours from your original request.';
            this.errorState = true;
            //this.snackService.open('You have already received tokens, try again in 24 hours');
          }
        }
      }
      )
    )
  }

  ngOnDestroy(): void {
    /* this.stepIndex = 1;
    this.maticHash = null;
    this.usdcHash = null;
    this.steps.map((step: any) => {
      step.loading = false;
      step.step = false;
    });
    this.tokensClaimed = {matic: false, usdc: false}; */
    this.web3Service.resetUsdcAndMaticResponse();
    this.subs.unsubscribe();
  }

}
