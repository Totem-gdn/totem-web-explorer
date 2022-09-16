import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SidebarState } from '@app/core/models/sidebar-type-interface.model';
import { UserEntity } from '@app/core/models/user-interface.model';
import { UserStateService } from '@app/core/services/user-state.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { SidenavStateService } from '@app/shared/services/sidenav-state.service';
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
  userFullName: string = '';
  walletNumber: string = '';

  @Input() loggedIn: boolean = false;
  @Output() logInEvent: EventEmitter<boolean> = new EventEmitter();

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
    console.log('IS LOGGED IN SIDENAV: ', this.loggedIn);
    this.subs.add(
      this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
        console.log(user)
        this.user$.next(user);
      })
    )
  }

  initUserListener() {
    this.subs.add(
      this.user$.subscribe((user: UserEntity | null) => {
        if (user) {
          this.userData = user;
          const userName = user?.name || '';
          this.userFullName = userName;
          if (this.userData?.name?.length! > 16) {
            this.userData!.name = userName?.slice(0, 16) + '...';
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

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}
