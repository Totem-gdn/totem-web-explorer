import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { NavigationService } from "../services/navigation/navigation.service";
import { UserService } from "../services/user/user.service";


@Injectable({
    providedIn: 'root'
})

export class GuestDataResolver implements Resolve<any> {

    constructor(private userService: UserService,
                private navigationService: NavigationService) {

    }


    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this.userService.guestUser(),
            this.navigationService.guestNavigation(),
        ]);
    }

}