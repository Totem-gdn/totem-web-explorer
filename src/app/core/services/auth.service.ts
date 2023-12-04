import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { TransactionDialogService } from "@app/layout/components/popups/dialogs/transaction-dialog/services/transaction-dialog.service";
import { OnDestroyMixin, untilComponentDestroyed } from "@w11k/ngx-componentdestroyed";
import { Gtag } from "angular-gtag";
import { BehaviorSubject, Observable } from "rxjs";
import { WelcomeDialogService } from "../dialogs/welcome-dialog/services/welcome-dialog.service";
import { StorageKey } from "../models/enums/storage-keys.enum";
import { GIVEAWAY_STATUS } from "../models/enums/token.enum";
import { OpenLoginUserInfo, UserEntity } from "../models/interfaces/user-interface.model";
import { WelcomeUser } from "../models/interfaces/welcome-tokens.model";
import { Web3AuthService } from "../web3auth/web3auth.service";
import { TokenGiveawayService } from "./giveaway/token-giveaway.service";
import { RandomIconGeneratorService } from "./utils/icon-generator.service";
import { BaseStorageService } from "./utils/base-storage.service";


@Injectable({ providedIn: 'root' })

export class UserStateService extends OnDestroyMixin implements OnDestroy {
  private loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isLoading: Observable<boolean> = this.loading$.asObservable();

  private userInfo$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  currentUser: Observable<UserEntity | null> = this.userInfo$.asObservable();

  constructor(
    private web3AuthService: Web3AuthService,
    private snackNotifierService: SnackNotifierService,
    private router: Router,
    private gtag: Gtag,
    private tokenGiveawayService: TokenGiveawayService,
    private welcomeDialogService: WelcomeDialogService,
    private transactionDialogService: TransactionDialogService,
    private randomIconGeneratorService: RandomIconGeneratorService,
    private baseStorageService: BaseStorageService
  ) {
    super();
  }


  async initAccount() {
    this.loading$.next(true);
    await this.web3AuthService.init();
    // const accounts = await this.web3AuthService.getAccounts();
    const isLoggedIn = this.web3AuthService.isLoggedIn();
    // console.log('is loggedin', isLoggedIn)
    // // this.loading$.next(false);
    if (isLoggedIn) {
      await this.getUserInfoViaWeb3();
    }
    this.loading$.next(false);
  }

  async login(redirectUrl?: string) {
    await this.web3AuthService.login();
    this.loading$.next(true);
    const currentUser = await this.getUserInfoViaWeb3(redirectUrl);
    this.gtag.event('login', {
      'event_label': `login user ${currentUser?.name} with provider ${currentUser?.typeOfLogin}`,
    });
    this.snackNotifierService.open('Logged in');
    this.loading$.next(false);
  }

  async getUserInfoViaWeb3(redirectUrl?: string) {
    console.log('get user')
    const wallet: string = await this.web3AuthService.getAccounts();
    const userInfo: OpenLoginUserInfo | undefined = await this.web3AuthService.getUserInfo();
    let token = userInfo?.idToken;
    let publicKey;
    if (userInfo?.idToken) {
      // Social Wallets
      token = userInfo?.idToken;
      publicKey = this.parseJwt(token).wallets[0].public_key;
      localStorage.setItem(StorageKey.USER_INFO, JSON.stringify({ userInfo, key: publicKey }));
    } else {
      // External Wallets
      token = await this.web3AuthService.walletJWTToken();
      publicKey = this.parseJwt(token).wallets[0].address;
      const userInfo = {
        idToken: token
      }
      localStorage.setItem(StorageKey.USER_INFO, JSON.stringify({ userInfo, key: publicKey, typeOfAuth: 'external' }));
      //this.getUsersTokenGiveawayState();

    }

    console.log(wallet);
    const profileImage: string = userInfo?.profileImage ? userInfo?.profileImage : this.randomIconGeneratorService.getUserIcon(wallet);
    //this.randomIconGeneratorService.getUserIcon(wallet);

    const userToUse: UserEntity = {
      name: userInfo?.name,
      email: userInfo?.email,
      profileImage: profileImage,
      wallet: wallet
    }
    this.setUserAfterLogin();
    this.userInfo$.next(userToUse);
    if (redirectUrl) {
      this.router.navigate([redirectUrl]);
    }
    return userInfo;
  }

  private setUserAfterLogin() {
    this.tokenGiveawayService.getActivity().pipe(
      untilComponentDestroyed(this),
    ).subscribe();
  }

  private openWelcomeDialog() {
    this.welcomeDialogService.openWelcomeDialog().pipe(
      untilComponentDestroyed(this),
    ).subscribe((data: { status: string }) => {
      if (data && data.status == GIVEAWAY_STATUS.ACCEPTED) {
        // open tx dialog
        this.gtag.event('welcome_dialog_accept', {
          event_label: 'Welcome dialog accept',
        });
      }
      if (data && data.status == GIVEAWAY_STATUS.REJECTED) {
        // do nothing (to delete)
        this.gtag.event('welcome_dialog_reject', {
          event_label: 'Welcome dialog reject',
        });
      }
    })

  }

  private openTxDialog() {
    this.transactionDialogService.openTxDialogModal().pipe(
      untilComponentDestroyed(this),
    ).subscribe((data: { matic: boolean, usdc: boolean }) => { })

  }

  async logout() {
    await this.web3AuthService.logout();
    this.snackNotifierService.open('Signed out');
    localStorage.removeItem(StorageKey.USER_INFO);
    localStorage.removeItem('profile-image');
    this.userInfo$.next(null);
    this.router.navigate(['/']);
  }
  async logoutWithoutRedirect() {
    await this.web3AuthService.logout();
    this.snackNotifierService.open('Signed out');
    localStorage.removeItem('user-info');
    localStorage.removeItem('profile-image');
    this.userInfo$.next(null);
  }

  isLoggedIn(): boolean {
    return this.web3AuthService.isLoggedIn();
  }

  isLoggedInComplex(): boolean {
      const isAuthenticated = this.isLoggedIn();

      let userDataToGuard: any = null;
      userDataToGuard = JSON.parse(this.baseStorageService.getItem(StorageKey.OPEN_LOGIN)!);
      const userData = JSON.parse(localStorage.getItem(StorageKey.USER_INFO)!);
      if (userData) {
        userDataToGuard = userData.userInfo;
      }

      const isAuthenticatedCache =
          !!(userDataToGuard?.idToken)
          &&
          !!(this.baseStorageService.getItem(StorageKey.ADAPTER));

      if (!isAuthenticatedCache && !isAuthenticated) {
          return false;
      }

      // add check on expire date Token
      const jwtInfo = this.parseJwt(userDataToGuard?.idToken);

      const expDate = new Date(+(jwtInfo.exp + '000'));
      if (expDate < new Date() || this.web3AuthService.isLoggedIn() && !localStorage.getItem(StorageKey.USER_INFO)) {
        this.logoutWithoutRedirect();
        return false;
      }
      return isAuthenticatedCache || isAuthenticated;
  }

  parseJwt(token: string | undefined) {
    if (!token) return null;
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  };
}
