import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import {  Router } from '@angular/router';
import { NavigationService } from '@app/core/services/navigation/navigation.service';
import { NavigationItem } from '@app/core/services/navigation/navigation.types';
import { UserService } from '@app/core/services/user/user.service';
import { User } from '@app/core/services/user/user.types';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
    selector     : 'guest-layout',
    templateUrl  : './guest.component.html',
    encapsulation: ViewEncapsulation.None,
    
})
export class GuestLayoutComponent implements OnInit, OnDestroy
{
    // Maintane all subscriptions active
    private _subscriptions: Subject<any> = new Subject<any>();


    constructor(
        private userService: UserService,
        private router: Router,
        private navigationService: NavigationService
    ){}


    toggle = false;
    navigationItems: NavigationItem[] = [];
    user!: User;
    

    ngOnInit(): void
    {   
        // Subscribe to navigation service
        this.navigationService.guestNavigation()
            .pipe(takeUntil(this._subscriptions))
            .subscribe((navigation: NavigationItem[]) => {
                this.navigationItems = navigation;
            })

        // Subscribe to the user service
        this.userService.user$
            .pipe(takeUntil(this._subscriptions))
            .subscribe((user: User) => {
                this.user = user;
            });
    }

    
    onClickNavItem(link: string) {
        // Navigate to Nav Item link
        this.router.navigate([`${link}`])
    }

    onSelectUser() {
        // Navigate to user profile
        this.router.navigate(['/dashboard/profile']);
    }

    // Toggle navigation menu
    toggleNavigation(name: string): void
    {
        if(name === 'largeScreen') {
            this.toggle = !this.toggle;
        }

        // if screen small create overlay 
        if(name === 'smallScreen') {
            this.toggle = !this.toggle;
        }
    }

    // Unsubscribe from all subscriptions
    ngOnDestroy(): void
    {
        this._subscriptions.next(null);
        this._subscriptions.complete();
    }

}
