import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { AvatarService } from "../services/crypto/avatar.service";
import { NavigationService } from "../services/navigation/navigation.service";
import { UserService } from "../services/user/user.service";


@Injectable({
    providedIn: 'root'
})
export class InitialDataResolver implements Resolve<any>
{
    /**
     * Constructor
     */
    constructor(
        private navigationService: NavigationService,
        private userService: UserService,
        private avatarService: AvatarService,
    )
    {
    }

    /**
     * Use this resolver to resolve initial mock-api for the application
     *
     * @param route
     * @param state
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this.navigationService.get(),
            this.userService.get(),
            this.avatarService.get(),
        ]);
    }
}