import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { ViewportScroller } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentSuccessDialogService } from '@app/core/dialogs/payment-success-dialog/services/payment-success-dialog.service';
import { StoreService } from '@app/core/store/store.service';
import { ServiceWorkerService } from '@app/service-worker.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserStateService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class TotemEventListenerService {

  private currentBreakpoint: BehaviorSubject<string> = new BehaviorSubject<string>('');
  currentBreakpoint$: Observable<string> = this.currentBreakpoint.asObservable();
  displayNameMap = new Map([
    [Breakpoints.XSmall, 'XSmall'],
    ['(min-width: 600px) and (max-width: 767.98px)', 'XMSmall'],
    ['(min-width: 768px) and (max-width: 861.98px)', 'MSmall'],
    ['(min-width: 862px) and (max-width: 999.98px)', 'Small'],
    ['(min-width: 1000px) and (max-width: 1099.98px)', 'Medium'],
    ['(min-width: 1100px) and (max-width: 1379.98px)', 'Large'],
    ['(min-width: 1380px) and (max-width: 1679.98px)', 'XLarge'],
    ['(min-width: 1680px) and (max-width: 1919.98px)', 'XXLarge'],
    [Breakpoints.XLarge, 'XXXLarge'],
  ]);

  constructor(
    private userStateService: UserStateService,
    private router: Router,
    private route: ActivatedRoute,
    private storeService: StoreService,
    private paymentSuccessDialogService: PaymentSuccessDialogService,
    private breakpointObserver: BreakpointObserver
  ) {

  }

  observeTheScreen() {
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        '(min-width: 600px) and (max-width: 767.98px)',
        '(min-width: 768px) and (max-width: 861.98px)',
        '(min-width: 862px) and (max-width: 999.98px)',
        '(min-width: 1000px) and (max-width: 1099.98px)',
        '(min-width: 1100px) and (max-width: 1379.98px)',
        '(min-width: 1380px) and (max-width: 1679.98px)',
        '(min-width: 1680px) and (max-width: 1919.98px)',
        Breakpoints.XLarge
      ])
      .subscribe((state: BreakpointState) => {
        for (const query of Object.keys(state.breakpoints)) {
          if (state.breakpoints[query]) {

            this.currentBreakpoint.next(this.displayNameMap.get(query) ?? 'Unknown');
          }
        }
      })
  }

  listenAssetsPageScreenChanges(): Observable<BreakpointState> {
    return this.breakpointObserver
      .observe(['(min-width: 480px)', '(min-width: 768px)', '(min-width: 1000px)', '(min-width: 1280px)', '(min-width: 1440px)']);
  }

  initListeners() {
    this.observeTheScreen();
    this.storeService.getAssetsAndGames();
    this.storeService.getLegacies();
    this.listenWindow();
  }

  getQueryParamsAfterPayment() {
    this.userStateService.currentUser.subscribe(user => {
      if(user) {
        const paramSnapshot = this.route.snapshot;
        const paymentResult: string = paramSnapshot.queryParams['payment_result'];
        const assetType: string = paramSnapshot.queryParams['type'];
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
    if (window.opener) {
      this.route.queryParams.subscribe(params => {
        if (params && params["type"] && params["payment_result"]) {
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

    if (paymentResult && assetType) {
      targetWindow.postMessage(message);
    }
  }

}
