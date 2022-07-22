import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { User } from './user.types';

@Injectable({
    providedIn: 'root'
})
export class UserService
{
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);

    constructor()
    {
    }

    /**
     * Setter & getter for user
     */
    set user(value: User)
    {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User>
    {
        return this._user.asObservable();
    }



    set saveUserToStorage(user: User) {
        this.user = user;

        localStorage.setItem('userData', JSON.stringify(user));

    }

    get getUserFromStorage() {
        const jsonUser = localStorage.getItem('userData');

        if(!jsonUser) return;

        const user: any = JSON.parse(jsonUser);

        return user;
    }

    

    get(): Observable<User> {
        const user = this.getUserFromStorage;

        this.user = user;
        
        return of(user);
    }

    guestUser(): Observable<User> {
        const user = this.getUserFromStorage;

        if(!user) {
            const user = { name: 'Guest' };

            this.user = user;

            return of(user);
        };
        
        return of(this.user);
    }

}
