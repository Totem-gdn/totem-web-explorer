import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { TokenBalance } from '@app/core/models/interfaces/token-balance.modle';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { CryptoUtilsService } from '@app/core/services/crypto/crypto-utils.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'totem-user-profile-dropdown',
  templateUrl: './totem-profile-dropdown.component.html',
  styleUrls: ['./totem-profile-dropdown.component.scss'],
})
export class TotemProfileDropdownComponent implements OnDestroy {

  constructor(
    private router: Router,
    private snackNotifierService: SnackNotifierService,
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
    this.initBalanceListener();
  }

  initBalanceListener() {
    this.sub = this.cryptoUtilsService.tokenBalance$.subscribe((balance: TokenBalance) => {
      this.balance = balance;
    });
  }

  onNavigateMessages() {
    this.router.navigate(['/profile/messages']);
    this.closedEvent.emit(false);
  }

  onNavigateProfile() {
    this.router.navigate(['/profile']);
    this.closedEvent.emit(false);
  }

  updateProfileImage() {
    if (this.user) {
      this.user.profileImage = 'assets/icons/nav/account_circle.svg';
    }
  }

  // utils

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  async logOut() {
    await this.userStateService.logout();
    this.closedEvent.emit(false);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

}
