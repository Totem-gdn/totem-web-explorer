import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, delay, filter } from 'rxjs';
import { PurchaseSuccessDialogService } from './core/dialogs/purchase-success-dialog/services/purchase-success-dialog.service';
import { UserStateService } from './core/services/auth.service';
import { ServiceWorkerService } from './service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'flex flex-auto w-full'
  }
})
export class AppComponent {

  title = 'Totem Explorer';

  static isBrowser = new BehaviorSubject<boolean | null>(null);

  constructor(
    private userStateService: UserStateService,
    @Inject(PLATFORM_ID) private platformId: any,
    private router: Router,
    private route: ActivatedRoute,
    private viewportScroller: ViewportScroller,
    private gtag: Gtag,
    private sWService: ServiceWorkerService,
    private purchaseSuccessDialogService: PurchaseSuccessDialogService,
  ) {

    AppComponent.isBrowser.next(isPlatformBrowser(this.platformId));
    this.userStateService.initAccount();
    this.sWService.listenNewVersion();
    this.router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))
      .subscribe((e) => {
        if (e.position) {
          this.viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          this.viewportScroller.scrollToAnchor(e.anchor);
        } else {
          const url = e.routerEvent.url;
          if (url === '/profile/user-items' || url === '/profile/user-games' || url === '/profile/user-avatars' || url === '/profile/user-gems') return;
          this.viewportScroller.scrollToPosition([0, 0]);
        }
      });

    this.gtag.event('page_view');

    this.userStateService.currentUser.subscribe(user => {
      if(user) {
        console.log(this.route.snapshot);
        const paramSnapshot = this.route.snapshot;
        const paymentResult: string = paramSnapshot.queryParams['payment_result'];
        const assetType: string = paramSnapshot.queryParams['type'];
        if (paymentResult === 'success' && assetType) {
          this.purchaseSuccessDialogService.openPurchaseSuccessDialog(paymentResult, assetType).subscribe((data: boolean) => {
            if (data == true) {
              this.router.navigate(['profile']);
            }
            if (data == false) {
              this.router.navigate(['/']);
            }
          });
        }
      }
    });

  }

}
