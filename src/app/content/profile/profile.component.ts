import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { UserStateService } from '@app/core/services/auth.service';
import { ProfileService } from '@app/core/services/profile.service';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, Subscription } from 'rxjs';

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
  currentUser$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);

  constructor(private router: Router,
    private userStateService: UserStateService,
    private metaTag: Meta,
    private profileService: ProfileService,
    private gtag: Gtag) {

  }

  async ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )

    this.subs.add(
      this.userStateService.currentUser.subscribe(user => {
        if (user) {
          this.prepeareUserData(user);
        }
      })
    )
  }

  prepeareUserData(user: UserEntity | null) {
    if (!user) {
      this.currentUser$.next(user);
      return;
    };

    const userData = user;
    let slicedName: string = '';

    if (userData?.name?.length! > 16) {
      slicedName = userData!.name?.slice(0, 16) + '...';
    }
    const slicedWallet: string = userData.wallet?.slice(0, 9) + '...' + userData.wallet?.slice(-4);

    const userToUse: UserEntity = {
      ...userData,
      slicedName: slicedName,
      slicedWallet: slicedWallet
    }

    this.currentUser$.next(userToUse);
  }

  getAccountMeta() {
    this.subs.add(
      this.profileService.getUserAssetsCount().subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
