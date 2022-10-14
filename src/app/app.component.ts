import { isPlatformBrowser, ViewportScroller } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, Scroll } from '@angular/router';
import { Web3Auth } from '@web3auth/web3auth';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, delay, filter } from 'rxjs';
import { UserStateService } from './core/services/user-state.service';
import { Web3AuthService } from './core/web3auth/web3auth.service';

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
    private web3: Web3AuthService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private gtag: Gtag) {

    AppComponent.isBrowser.next(isPlatformBrowser(platformId));
    this.userStateService.initAccount();

    router.events
      .pipe(filter((e): e is Scroll => e instanceof Scroll))
      .pipe(delay(1))
      .subscribe((e) => {
        if (e.position) {
          viewportScroller.scrollToPosition(e.position);
        } else if (e.anchor) {
          viewportScroller.scrollToAnchor(e.anchor);
        } else {
          const url = e.routerEvent.url;
          if(url === '/profile/user-items' || url === '/profile/user-games' || url === '/profile/user-avatars' || url === '/profile/user-gems') return;
          viewportScroller.scrollToPosition([0, 0]);
        }
      });

      gtag.pageview();
  }

  ngOnInit() {
  }

}
