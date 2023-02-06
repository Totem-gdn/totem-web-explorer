import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentSuccessDialogService } from '@app/core/dialogs/payment-success-dialog/services/payment-success-dialog.service';
import { StoreService } from '@app/core/store/store.service';
import { ServiceWorkerService } from '@app/service-worker.service';
import { UserStateService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TotemEventListenerService {

  constructor(
    private userStateService: UserStateService,
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private paymentSuccessDialogService: PaymentSuccessDialogService
  ) {
    console.log(window.location);

  }

  initListeners() {
    this.storeService.getAssetsAndGames();
    //this.getQueryParamsAfterPayment();
    this.listenWindow();
  }

  getQueryParamsAfterPayment() {
    this.userStateService.currentUser.subscribe(user => {
      if(user) {
        const paramSnapshot = this.route.snapshot;
        const paymentResult: string = paramSnapshot.queryParams['payment_result'];
        const assetType: string = paramSnapshot.queryParams['type'];
        console.log(paramSnapshot);
        if (paymentResult === 'success' && assetType) {
          this.paymentSuccessDialogService.openPaymentSuccessDialog(paymentResult, assetType).subscribe((data: boolean) => {
            if (data == true) {
              this.router.navigate(['my-assets']);
            }
            if (data == false) {
              this.router.navigate(['/']);
            }
          });
        }
      }
    });
  }

  processParams(message: {assetType: string, paymentResult: string, target: string}) {
    this.userStateService.currentUser.subscribe(user => {
      if(user) {
        const paymentResult: string = message.paymentResult;
        const assetType: string = message.assetType;
        if (paymentResult === 'success' && assetType) {
          this.paymentSuccessDialogService.openPaymentSuccessDialog(paymentResult, assetType).subscribe((data: boolean) => {
            if (data == true) {
              this.router.navigate(['my-assets']);
            }
            if (data == false) {
              this.router.navigate(['/']);
            }
          });
        }
        if (paymentResult === 'error' && assetType) {
          this.paymentSuccessDialogService.openPaymentSuccessDialog(paymentResult, assetType).subscribe((data: boolean) => {
            if (data == true) {
              this.router.navigate(['my-assets']);
            }
          });
        }
      }
    });
  }

  listenWindow() {
    console.log('ITS OUR OPENER: ', window.opener);
    if (window.opener) {
      this.route.queryParams.subscribe(params => {
        if (params && params["type"] && params["payment_result"]) {
          console.log(params);
          this.processQueryParamsAndRedirect();
        }
      });
    }
  }

  processQueryParamsAndRedirect() {
    let targetWindow = window.opener;
    let origin: string = window.location.origin;

    const paramSnapshot = this.route.snapshot;

    const paymentResult: string = paramSnapshot.queryParams['payment_result'];
    const assetType: string = paramSnapshot.queryParams['type'];

    const message = {
      assetType: assetType,
      paymentResult: paymentResult,
      target: origin
    }

    console.log(message);
    if (paymentResult && assetType) {
      targetWindow.postMessage(message);
    }
  }

}
