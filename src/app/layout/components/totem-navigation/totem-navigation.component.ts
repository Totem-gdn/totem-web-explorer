import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from '@app/core/models/user-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { ProfileStateService } from '@app/shared/services/profile-state.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';
import { SideProfileStateService } from '@app/shared/services/sideprofile-state.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-navigation',
  templateUrl: './totem-navigation.component.html',
  styleUrls: ['./totem-navigation.component.scss']
})
export class TotemNavigationComponent implements OnInit, OnDestroy {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  allowNavigation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currUser: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  isLoggedIn: boolean = false;
  subs: Subscription = new Subscription();

  constructor(private web3Auth: Web3AuthService,
    private router: Router,
    private sidenavStateService: SidenavStateService,
    private sideProfileStateService: SideProfileStateService,
    private snackNotifierService: SnackNotifierService,
    private profileStateService: ProfileStateService,
    private userStateService: UserStateService
    ) {}

  ngOnInit(): void {
    //this.tryToInitWeb3();
    this.initUserAndLoadingListener();
    //this.profileStateService.sidenavStatus.subscribe((data: boolean) => {
    //  if (data) {
    //    let userData = JSON.parse(localStorage.getItem('openlogin_store')!);
    //    this.avatar = userData.profileImage;
    //    this.loggedIn = true;
    //    this.allowNavigation.next(true);
    //    this.loading = false;
    //  }
    //})
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initUserAndLoadingListener() {

    this.subs.add(
      this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
        this.currUser.next(user);
        this.isLoggedIn = !!user;
        this.allowNavigation.next(true);
      })
    )

    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value)
      })
    )

  }

/*  async tryToInitWeb3() {
    try {
      this.loading = true;
      await this.web3Auth.init();
      this.wallet = await this.web3Auth.getAccounts();
      if (this.wallet) {
        const userInfo: any = await this.web3Auth.getUserInfo();
        this.avatar = userInfo.profileImage;
        this.loggedIn = true;
        console.log(userInfo, this.wallet);
      }
      this.allowNavigation.next(true);
      this.loading = false;
      this.cdr.markForCheck();
    } catch (err: any) {
      console.log(err, 'INIT ERRROR');
      this.loading = false;
      this.cdr.markForCheck();
    };
  } */

  /* async web3Login() {

    if(this.web3Auth.isLoggedIn()) {
      this.openSideProfile();
    }

    if (!this.web3Auth.isLoggedIn()) {
      try {
        await this.web3Auth.init();
        console.log('LOGGG');

        await this.web3Auth.login();
        console.log('start loading if user selected login case');
        this.loading = true;
        this.allowNavigation.next(false);
        const userInfo: any = await this.web3Auth.getUserInfo();
        this.wallet = await this.web3Auth.getAccounts();
        const avatar = userInfo.profileImage;
        this.avatar = avatar;
        this.loading = false;
        console.log('SUCCESS LOGGED IN');
        this.loggedIn = true;
        this.allowNavigation.next(true);
        this.cdr.markForCheck();
      } catch (err: any) {
        console.log(err, 'LOGIN ERRROR');
        this.loading = false;
        this.cdr.markForCheck();
      };
    }

  } */

  /* async processLogIn() {
    console.log('start loading if user selected login case');
    this.loading = true;
    this.allowNavigation.next(false);
    const userInfo: any = await this.web3Auth.getUserInfo();
    this.wallet = await this.web3Auth.getAccounts();
    const avatar = userInfo.profileImage;
    this.avatar = avatar;
    this.loading = false;
    console.log('SUCCESS LOGGED IN');
    this.loggedIn = true;
    this.allowNavigation.next(true);
    this.cdr.markForCheck();
  } */

  openSidenav() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'nav'});
  }

  openSidefilter() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'filter'});
  }

  openSideProfile() {
    this.sideProfileStateService.updateState(true);
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

}
