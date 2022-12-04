import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { StorageKey } from "../models/enums/storage-keys.enum";
import { BaseStorageService } from "../services/utils/base-storage.service";
import { UserStateService } from "../services/auth.service";
import { PopupService } from "@app/core/services/states/popup-state.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userStateService: UserStateService,
        private router: Router,
        private baseStorageService: BaseStorageService,
        private popupService: PopupService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        const isAuthenticated = this.userStateService.isLoggedIn();

        const openLogin = JSON.parse(this.baseStorageService.getItem(StorageKey.OPEN_LOGIN)!);

        const isAuthenticatedCache =
            !!(openLogin?.idToken)
            &&
            !!(this.baseStorageService.getItem(StorageKey.ADAPTER));


        if (!isAuthenticatedCache && !isAuthenticated) {
            this.router.navigate(['/']);
        }
        // add check on expire date Token
        const jwtInfo = this.userStateService.parseJwt(openLogin.idToken);
        const expDate = new Date(+(jwtInfo.exp + '000'));
        if (expDate < new Date()) {
          this.popupService.showLogout();
          this.userStateService.logoutWithoutRedirect();
        }
        return isAuthenticatedCache || isAuthenticated;
    }
}
