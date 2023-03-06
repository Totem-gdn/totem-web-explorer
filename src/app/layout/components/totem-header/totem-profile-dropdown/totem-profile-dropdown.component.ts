import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';

@Component({
  selector: 'totem-user-profile-dropdown',
  templateUrl: './totem-profile-dropdown.component.html',
  styleUrls: ['./totem-profile-dropdown.component.scss'],
})
export class TotemProfileDropdownComponent {

  constructor(
    private router: Router,
    private snackNotifierService: SnackNotifierService,
    private userStateService: UserStateService,
  ) {}

  @Input() balance: string | undefined = undefined;
  @Input() user: UserEntity | null = null;
  @Output() closedEvent: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
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

}
