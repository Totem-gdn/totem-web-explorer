import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { StorageKey } from '@app/core/enums/storage-keys.enum';
import { UserEntity } from '@app/core/models/user-interface.model';
import { BaseStorageService } from '@app/core/services/base-storage.service';
import { UserStateService } from '@app/core/services/user-state.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, map, Subscription, take, takeUntil } from 'rxjs';
import { Meta } from '@angular/platform-browser';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { AssetsService } from '@app/core/services/assets/assets.service';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  host: {
    class: 'flex flex-auto w-full h-full'
  }
})
export class ProfileComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  routeValue$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private router: Router,
    private userStateService: UserStateService,
    private metaTag: Meta,
    private alchService: AlchemyService,
    private web3: Web3AuthService,
    private assetsService: AssetsService) {

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
