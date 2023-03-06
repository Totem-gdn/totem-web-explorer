import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { UserStateService } from '@app/core/services/auth.service';
import { ProfileService } from '@app/core/services/profile.service';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'profile-information',
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.scss'],
  animations: Animations.animations
})
export class ProfileInformationComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  @Input() user: UserEntity | null = null;
  @Input() ownerMode: boolean = true;

  constructor(private router: Router,
    private userStateService: UserStateService,
    private metaTag: Meta,
    private profileService: ProfileService,
    private snackNotifierService: SnackNotifierService,
    private gtag: Gtag) {
  }

  async ngOnInit() {
    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value);
      })
    )

    this.subs.add(
      this.userStateService.currentUser.subscribe(user => {
        if (user) {
          this.getAccountMeta(user.wallet);
        }
      })
    )
  }


  updateProfileImage() {
    if (this.user) {
      this.user.profileImage = 'assets/icons/nav/account_circle.svg'
    }
  }

  getAccountMeta(wallet?: string) {
    this.subs.add(
      this.profileService.getUserAssetsCount(wallet ? wallet: '').subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  goToMessages() {
    this.router.navigate(['profile/messages']);
  }

  goToSubmitPage() {
    this.router.navigate(['submit-game']);
  }

  logOut() {
    this.userStateService.logout();
  }

  copied() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

}
