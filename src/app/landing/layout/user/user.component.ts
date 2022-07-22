import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '@app/core/services/user/user.service';
import { User } from '@app/core/services/user/user.types';
import { AuthService } from '@app/core/auth/auth.service';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    // Maintane all subscriptions active
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    isAuthenticated!: boolean;

    constructor(
        private _router: Router,
        private userService: UserService,
        private authService: AuthService){}

    user!: User;

    
    ngOnInit(): void
    {
        //Check if user authenticated
        this.authService.check()
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        })


        // Subscribe to user changes
        this.userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });
    }


    onClickProfile() {
        // Navigate to user profile
        this._router.navigate(['/dashboard/profile']);
    }

    // Unsubscribe from all subscriptions
    ngOnDestroy(): void
    {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    signOut(): void
    {
        this._router.navigate(['/sign-out']);
    }
    signIn(): void
    {
        this._router.navigate(['/sign-in']);
    }
}
