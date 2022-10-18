import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { StorageKey } from "../enums/storage-keys.enum";
import { OpenLoginUserInfo, UserEntity } from "../models/user-interface.model";
import { Web3AuthService } from "../web3auth/web3auth.service";


@Injectable({ providedIn: 'root' })

export class UserStateService implements OnDestroy {
  subs: Subscription = new Subscription();

  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: Observable<boolean> = this.loading$.asObservable();

  private userInfo$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  currentUser: Observable<UserEntity | null> = this.userInfo$.asObservable();

  constructor(
    private web3AuthService: Web3AuthService,
    private snackNotifierService: SnackNotifierService,
    private router: Router
  ) { }

  async initAccount() {
    this.loading$.next(true);
    await this.web3AuthService.init();
    const isLoggedIn = this.web3AuthService.isLoggedIn();
    if (isLoggedIn) {
      await this.getUserInfoViaWeb3();
    }
    this.loading$.next(false);
  }

  async login() {
    console.log('login')
    await this.web3AuthService.login();
    this.loading$.next(true);
    await this.getUserInfoViaWeb3();
    this.snackNotifierService.open('Logged in');
    this.loading$.next(false);
  }

  async getUserInfoViaWeb3() {
    const wallet: string = await this.web3AuthService.getAccounts();
    const userInfo: OpenLoginUserInfo | undefined = await this.web3AuthService.getUserInfo();
    let token = userInfo?.idToken;
    let publicKey;
    if(userInfo?.idToken) {
      // Social Wallets
      token = userInfo?.idToken;
      publicKey = this.parseJwt(token).wallets[0].public_key;
      localStorage.setItem(StorageKey.USER_INFO, JSON.stringify({userInfo, key: publicKey}));
    } else {
      // External Wallets
      token = await this.web3AuthService.walletIdToken();
      publicKey = this.parseJwt(token).wallets[0].address;
      console.log(this.parseJwt(token))
      const userInfo = {
        idToken: token
      }
      localStorage.setItem(StorageKey.USER_INFO, JSON.stringify({userInfo, key: publicKey}));
    }

    const userToUse: UserEntity = {
      name: userInfo?.name,
      email: userInfo?.email,
      profileImage: userInfo?.profileImage,
      wallet: wallet
    }
    this.userInfo$.next(userToUse);
  }

  async logout() {
    await this.web3AuthService.logout();
    this.snackNotifierService.open('Signed out');
    localStorage.removeItem('user-info');
    this.userInfo$.next(null);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return this.web3AuthService.isLoggedIn();
  }

  parseJwt(token: string | undefined) {
    if(!token) return null;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
