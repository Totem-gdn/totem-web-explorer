import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { OpenLoginUserInfo, UserEntity } from "../models/user-interface.model";
import { Web3AuthService } from "../web3auth/web3auth.service";


@Injectable({providedIn: 'root'})

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
    ) {}

  async initAccount() {
    this.loading$.next(true);
    await this.web3AuthService.init();
    const isLoggedIn = this.web3AuthService.isLoggedIn();
    console.log('INITED', isLoggedIn);
    if (isLoggedIn) {
      await this.getUserInfoViaWeb3();
    }
    this.loading$.next(false);
  }

  async login() {
    console.log('LOGGG');
    await this.web3AuthService.login();
    this.loading$.next(true);
    console.log('start loading if user selected login case');
    await this.getUserInfoViaWeb3();
    this.snackNotifierService.open('Logged in');
    this.loading$.next(false);
  }

  async getUserInfoViaWeb3() {
    const wallet: string = await this.web3AuthService.getAccounts();
    const userInfo: OpenLoginUserInfo | undefined = await this.web3AuthService.getUserInfo();
    const key: string = await this.web3AuthService.getPrivateKey();
    const token: any = await this.web3AuthService.authUser();
    console.log('user info', userInfo, key, token);
    localStorage.setItem('userinfo', JSON.stringify({userInfo, key}));
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
    this.userInfo$.next(null);
    this.router.navigate(['/home']);
  }

  isLoggedIn(): boolean {
    return this.web3AuthService.isLoggedIn();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
