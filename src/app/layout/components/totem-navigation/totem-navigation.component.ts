import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { ProfileStateService } from '@app/shared/services/profile-state.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';
import { SideProfileStateService } from '@app/shared/services/sideprofile-state.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'totem-navigation',
  templateUrl: './totem-navigation.component.html',
  styleUrls: ['./totem-navigation.component.scss']
})
export class TotemNavigationComponent implements OnInit {

  constructor(private web3Auth: Web3AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private sidenavStateService: SidenavStateService,
    private sideProfileStateService: SideProfileStateService,
    private snackNotifierService: SnackNotifierService,
    private profileStateService: ProfileStateService
    ) { }

  loading = false;
  avatar: undefined | string;
  loggedIn: boolean = false;
  wallet: string = '';
  allowNavigation: BehaviorSubject<boolean> = new BehaviorSubject(false);

  ngOnInit(): void {
    this.tryToInitWeb3();
    this.profileStateService.sidenavStatus.subscribe((data: boolean) => {
      if (data) {
        let userData = JSON.parse(localStorage.getItem('openlogin_store')!);
        this.avatar = userData.profileImage;
        this.loggedIn = true;
        this.allowNavigation.next(true);
        this.loading = false;
      }
    })
  }

  async tryToInitWeb3() {
    try {
      this.loading = true;
      await this.web3Auth.init();
      this.wallet = await this.web3Auth.getAccounts();
      if (this.wallet) {
        const userInfo: any = await this.web3Auth.getUserInfo();
        this.avatar = userInfo.profileImage;
        this.loggedIn = true;
        console.log('ALLOW LOADING NAVS');
      }
      this.allowNavigation.next(true);
      this.loading = false;
      this.cdr.markForCheck();
    } catch (err: any) {
      console.log(err, 'INIT ERRROR');
      this.loading = false;
      this.cdr.markForCheck();
    };
  }

  async web3Login() {

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

  }

  async processLogIn() {
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
  }

  openSidenav() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'nav'});
  }

  openSidefilter() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'filter'});
  }

  openSideProfile() {
    this.sideProfileStateService.updateState(true);
  }

  async logOut() {
    await this.web3Auth.logout();
    this.snackNotifierService.open('Signed out');
    this.avatar = undefined;
    this.loggedIn = false;
    this.router.navigate(['/home']);
    this.cdr.markForCheck();
  }

}
