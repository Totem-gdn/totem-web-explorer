import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UserStateService } from '@app/core/services/auth.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, map, Subscription, take, takeUntil } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { Gtag } from 'angular-gtag';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full min-h-[calc(100vh-70px)]'
  }
})
export class ProfileComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  routeValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router,
    private userStateService: UserStateService,
    private metaTag: Meta,
    private web3: Web3AuthService,
    private assetsService: AssetsService,
    private gtag: Gtag) {

    this.routeValue$.next(this.router.url);
    this.subs.add(this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.routeValue$.next(event.url);
      }
    }));
    this.metaTag.addTags([
      { name: 'description', content: 'This is an article about Angular Meta service' },
      { name: 'keywords', content: 'angular, javascript, typescript, meta, seo' }
    ]);
    gtag.event('page_view');
  }

  async ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )

    this.subs.add(
      this.userStateService.currentUser.subscribe(user => {
        if (user) this.assetsService.cacheTotal();
      })
    )
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
