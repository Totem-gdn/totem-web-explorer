import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { UserStateService } from '@app/core/services/auth.service';
import { SidenavStateService } from '@app/core/services/states/sidenav-state.service';
import { SideProfileStateService } from '@app/core/services/states/sideprofile-state.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-navigation',
  templateUrl: './totem-navigation.component.html',
  styleUrls: ['./totem-navigation.component.scss']
})
export class TotemNavigationComponent implements OnInit, OnDestroy {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  allowNavigation: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currUser: BehaviorSubject<UserEntity | null> = new BehaviorSubject<UserEntity | null>(null);
  isLoggedIn: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    private router: Router,
    private sidenavStateService: SidenavStateService,
    private sideProfileStateService: SideProfileStateService,
    private userStateService: UserStateService,
    ) {}

  ngOnInit(): void {
    this.initUserAndLoadingListener();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  initUserAndLoadingListener() {

    this.subs.add(
      this.userStateService.currentUser.subscribe((user: UserEntity | null) => {
        this.currUser.next(user);
        this.isLoggedIn = !!user;
        this.allowNavigation.next(true);
      })
    )

    this.subs.add(
      this.userStateService.isLoading.subscribe((value: boolean) => {
        this.loading$.next(value)
      })
    )

  }

  openSidenav() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'nav'});
  }

  openSidefilter() {
    this.sidenavStateService.updateLoadingStatus({isOpen: true, type: 'filter'});
  }

  openSideProfile() {
    this.sideProfileStateService.updateState(true);
  }

  logIn() {
    this.userStateService.login();
  }

  logOut() {
    console.log('Logout');
    this.userStateService.logout();
  }

  navigateToBuy() {
    // view_item_list gtag
    this.router.navigate(['/buy']);
  }

}
