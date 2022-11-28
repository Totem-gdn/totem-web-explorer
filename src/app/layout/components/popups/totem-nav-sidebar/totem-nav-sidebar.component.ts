import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { SidebarState } from '@app/core/models/interfaces/sidebar-type-interface.model';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { SidenavStateService } from '@app/core/services/states/sidenav-state.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-nav-sidebar',
  templateUrl: './totem-nav-sidebar.component.html',
  styleUrls: ['./totem-nav-sidebar.component.scss']
})
export class TotemNavSidebarComponent implements OnInit, OnDestroy {

  subs: Subscription = new Subscription();
  sidebarIsOpen: boolean = false;
  sidebarType: 'nav' | 'filter' = 'nav';
  userData: UserEntity | null = null;
  user$: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  wallet: string | undefined = '';
  userSlicedName: string = '';
  walletNumber: string = '';

  @Input() loggedIn: boolean = false;
  @Output() logInEvent: EventEmitter<boolean> = new EventEmitter();
  @Output() logOutEvent: EventEmitter<boolean> = new EventEmitter();

  constructor(private sidenavStateService: SidenavStateService,
    private web3Auth: Web3AuthService,
    private snackNotifierService: SnackNotifierService,
    private userStateService: UserStateService) { }

  ngOnInit(): void {
    this.sidenavStateService.sidenavStatus.subscribe((data: SidebarState) => {
      this.sidebarIsOpen = data.isOpen;
      this.sidebarType = data.type!;
    });
    this.initUserListener();
    this.listenAccountInfo();
  }

  listenAccountInfo() {
    this.subs.add(
      this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
        this.user$.next(user);
      })
    )
  }

  initUserListener() {
    this.subs.add(
      this.user$.subscribe((user: UserEntity | null) => {
        if(!user) this.userData = null;
        if (user) {
          this.userData = user;
          if (this.userData?.name?.length! > 16) {
            this.userSlicedName = this.userData!.name?.slice(0, 16) + '...';
          }
          this.wallet = this.userData?.wallet;
          this.walletNumber = this.wallet?.slice(0, 6) + '...' + this.wallet?.slice(-4);
        }
      })
    )
  }

  async logIn() {
    await this.userStateService.login();
    this.close();
    this.logInEvent.emit(true);
  }

  notify() {
    this.snackNotifierService.open('Copied to the clipboard');
  }

  close() {
    this.sidenavStateService.updateLoadingStatus({isOpen: false, type: this.sidebarType});
  }

  onLogout() {
    this.logOutEvent.emit(true);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
