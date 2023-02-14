import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { TokenBalance } from '@app/core/models/interfaces/token-balance.modle';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-header',
  templateUrl: './totem-header.component.html',
  styleUrls: ['./totem-header.component.scss'],
  animations: Animations.animations
})
export class TotemHeaderComponent implements OnInit, OnDestroy {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currUser$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  isLoggedIn: boolean = false;
  usdcBalance: string | undefined = undefined;
  subs: Subscription = new Subscription();
  showDropdown: boolean = false;

  searchOpened: boolean = false;

  constructor(
    private router: Router,
    private userStateService: UserStateService,
    private cryptoUtilsService: CryptoUtilsService,
    private snackNotifierService: SnackNotifierService,
    ) {}

  ngOnInit(): void {
    this.initUserAndLoadingListener();
    this.initBalanceListener();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initBalanceListener() {
    this.cryptoUtilsService.tokenBalance$.subscribe((balance: TokenBalance) => {
      console.log(balance);

      this.usdcBalance = balance.usdc;
    })
  }

  initUserAndLoadingListener() {

    this.subs.add(
      this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
        this.prepeareUserData(user);
      })
    )

    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )

  }

  prepeareUserData(user: UserEntity | null) {
    if (!user) {
      this.currUser$.next(user);
      return;
    };

    const userData = user;
    let slicedName: string = '';

    if (userData?.name?.length! > 10) {
      slicedName = userData!.name?.slice(0, 10) + '...';
    }
    const slicedWallet: string = userData.wallet?.slice(0, 6) + '...' + userData.wallet?.slice(-4);

    const userToUse: UserEntity = {
      ...userData,
      slicedName: slicedName,
      slicedWallet: slicedWallet
    }

    this.currUser$.next(userToUse);
    this.updateBalance();
  }

  updateProfileImage() {
    let user: UserEntity | null = this.currUser$.getValue();
    if (user) {
      user.profileImage = 'assets/icons/nav/account_circle.svg'
      this.currUser$.next(user);
    }
  }

  toggleSearchBar(flag: boolean) {
    this.searchOpened = flag;
  }

  updateBalance() {
    this.cryptoUtilsService.updateBalance();
  }

  logIn() {
    this.userStateService.login();
  }

  logOut() {
    this.userStateService.logout();
  }

  navigateToBuy() {
    this.router.navigate(['/buy']);
  }

  navigateToProfile() {
    this.router.navigate(['/profile']);
  }

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

}
