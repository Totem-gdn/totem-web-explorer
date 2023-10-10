import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { TokenBalance } from '@app/core/models/interfaces/token-balance.modle';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { TotemHeaderService } from '../totem-header.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'totem-profile-cover',
  templateUrl: './totem-profile-cover.component.html',
  styleUrls: ['./totem-profile-cover.component.scss'],
})
export class TotemProfileCoverComponent implements OnDestroy {

  constructor(
    private router: Router,
    private snackNotifierService: SnackNotifierService,
    private totemHeaderService: TotemHeaderService,
    private userStateService: UserStateService,
    private cryptoUtilsService: CryptoUtilsService,
  ) {}
  sub: Subscription = new Subscription();
  @Input() balance: TokenBalance = {
    matic: '0',
    totem: '0',
    usdc: '0'
  };
  @Input() user: UserEntity | null = null;
  @Output() closedEvent: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
      if (!user) return;
      this.prepeareUserData(user);
    });
    this.initBalanceListener();
  }

  initBalanceListener() {
    this.sub = this.cryptoUtilsService.tokenBalance$.subscribe((balance: TokenBalance) => {
      this.balance = balance;
    })
  }

  onNavigate(location: string) {
    this.router.navigate([location]);
    this.totemHeaderService.setCoverState(false);
  }

  updateProfileImage() {
    if (this.user) {
      this.user.profileImage = 'assets/icons/nav/account_circle.svg';
    }
  }

  // utils

  prepeareUserData(user: UserEntity) {
    const userData = user;
    let slicedName: string = '';

    if (userData?.name?.length! > 16) {
      slicedName = userData!.name?.slice(0, 16) + '...';
    }
    const slicedWallet: string = userData.wallet?.slice(0, 6) + '...' + userData.wallet?.slice(-4);

    const userToUse: UserEntity = {
      ...userData,
      slicedName: slicedName,
      slicedWallet: slicedWallet
    }

    this.user = userToUse;
  }

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  async logIn() {
    await this.userStateService.login();
    this.totemHeaderService.setCoverState(false);
  }

  async logOut() {
    await this.userStateService.logout();
    this.totemHeaderService.setCoverState(false);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
