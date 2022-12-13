import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, delay, filter } from 'rxjs';
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
    private viewportScroller: ViewportScroller,
    private gtag: Gtag,
    private sWService: ServiceWorkerService
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

    // this.userStateService.currentUser.subscribe(user => {
    //   if(user) {
    //     this.sellAsset.transferNft()
    //   }
    // })
  }

}
