import { Component, OnDestroy, OnInit, } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '@app/core/services/user/user.service';
import { User } from '@app/core/services/user/user.types';

@Component({
    selector       : 'user',
    templateUrl    : './user.component.html',
    exportAs       : 'user'
})
export class UserComponent implements OnInit, OnDestroy
{
    // Maintane all subscriptions active
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    constructor(
        private _router: Router,
        private userService: UserService,
    )
    {
    }

    user!: User;

    onClickProfile() {
        // Navigate to user profile
        this._router.navigate(['/dashboard/profile']);
    }
    
    ngOnInit(): void
    {
        // Subscribe to user changes
        this.userService.user$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((user: any) => {
                this.user = user;
            });
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
}
