import { Injectable } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Observable, of, ReplaySubject, switchMap } from 'rxjs';
import { NavigationItem } from './navigation.types';

@Injectable({
    providedIn: 'root'
})
export class NavigationService {

    constructor(private authService: AuthService) {

    }

    private _navigation: ReplaySubject<NavigationItem[]> = new ReplaySubject<NavigationItem[]>(1);


    get navigation$(): Observable<NavigationItem[]> {
        return this._navigation.asObservable();
    }


    get(): Observable<NavigationItem[]> {

        const items: NavigationItem[] = [
            {
                id: 'home',
                title: 'home',
                icon: 'home',
                link: '/home'
            },
            {
                id: 'items',
                title: 'items',
                icon: 'view_headline',
                link: '/dashboard/items'
            },
            {
                id: 'nfts',
                title: 'nfts',
                icon: 'view_headline',
                link: '/dashboard/crypto/nfts'
            },
            {
                id: 'nfts data',
                title: 'transactions',
                icon: 'view_headline',
                link: '/dashboard/crypto/transactions'
            },
        ];

        this._navigation.next(items);

        return of(items);
    }

    guestNavigation(): Observable<NavigationItem[]> {


        const items: NavigationItem[] = [
            {
                id: 'dashboard',
                title: 'dashboard',
                icon: 'view_headline',
                link: '/dashboard'
            }
        ]

        this._navigation.next(items);

        return of(items);


    }
}
