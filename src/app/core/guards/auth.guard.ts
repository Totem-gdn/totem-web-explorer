import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { StorageKey } from "../enums/storage-keys.enum";
import { BaseStorageService } from "../services/base-storage.service";
import { UserStateService } from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userStateService: UserStateService,
        private router: Router,
        private baseStorageService: BaseStorageService) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        const isAuthenticated = this.userStateService.isLoggedIn();

        const isAuthenticatedCache =
            !!(JSON.parse(this.baseStorageService.getItem(StorageKey.OPEN_LOGIN)!)?.idToken)
            &&
            !!(this.baseStorageService.getItem(StorageKey.ADAPTER));

        if (!isAuthenticatedCache && !isAuthenticated) {
            this.router.navigate(['/']);
        }
        return isAuthenticatedCache || isAuthenticated;
    }
}
