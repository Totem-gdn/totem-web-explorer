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
  ) {
    super();
  }


  async initAccount() {
    this.loading$.next(true);
    await this.web3AuthService.init();
    const isLoggedIn = this.web3AuthService.isLoggedIn();
    this.loading$.next(false);
    if (isLoggedIn) {
      await this.getUserInfoViaWeb3();
    }
    this.loading$.next(false);
  }

  async login() {
    await this.web3AuthService.login();
    this.loading$.next(true);
    const currentUser = await this.getUserInfoViaWeb3();
    this.gtag.event('login', {
      'event_label': `login user ${currentUser?.name} with provider ${currentUser?.typeOfLogin}`,
    });
    this.snackNotifierService.open('Logged in');
    this.loading$.next(false);
  }

  async getUserInfoViaWeb3() {
    const wallet: string = await this.web3AuthService.getAccounts();
    const userInfo: OpenLoginUserInfo | undefined = await this.web3AuthService.getUserInfo();
    let token = userInfo?.idToken;
    let publicKey;
    this.openWelcomeDialog();
    if (userInfo?.idToken) {
      // Social Wallets
      token = userInfo?.idToken;
      publicKey = this.parseJwt(token).wallets[0].public_key;
      localStorage.setItem(StorageKey.USER_INFO, JSON.stringify({ userInfo, key: publicKey }));
      this.getUsersTokenGiveawayState();
    } else {
      // External Wallets
      token = await this.web3AuthService.walletJWTToken();
      publicKey = this.parseJwt(token).wallets[0].address;
      const userInfo = {
        idToken: token
      }
      localStorage.setItem(StorageKey.USER_INFO, JSON.stringify({ userInfo, key: publicKey }));
      this.getUsersTokenGiveawayState();
    }

    const userToUse: UserEntity = {
      name: userInfo?.name,
      email: userInfo?.email,
      profileImage: userInfo?.profileImage,
      wallet: wallet
    }
    this.userInfo$.next(userToUse);
    return userInfo;
  }

  private getUsersTokenGiveawayState() {
    this.tokenGiveawayService.getActivity().pipe(
      untilComponentDestroyed(this),
    ).subscribe((data: WelcomeUser) => {
      if (data && data.welcomeTokens == 0) {
        this.openWelcomeDialog();
      }
    })

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
        this.openTxDialog();
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
