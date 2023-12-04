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
import { Web3AuthService } from "../web3auth/web3auth.service";
import { COLOR_POPUP_TYPE } from "../models/enums/popup.enum";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userStateService: UserStateService,
        private router: Router,
        private baseStorageService: BaseStorageService,
        private popupService: PopupService,
        private web3: Web3AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        const isAuthenticated = this.userStateService.isLoggedIn();

        let userDataToGuard: any = null;
        userDataToGuard = JSON.parse(this.baseStorageService.getItem(StorageKey.OPEN_LOGIN)!);
        const userData = JSON.parse(localStorage.getItem(StorageKey.USER_INFO)!);
        if (userData) {
          userDataToGuard = userData.userInfo;
        }

        const isAuthenticatedCache =
            !!(userDataToGuard?.idToken)
            &&
            !!(this.baseStorageService.getItem(StorageKey.ADAPTER));

        if (!isAuthenticatedCache && !isAuthenticated) {
            if (route.data['canAccess'] === 'allow-with-login') {
              return true;
            }
            this.router.navigate(['/']);
        }

        // add check on expire date Token
        const jwtInfo = this.userStateService.parseJwt(userDataToGuard?.idToken);

        const expDate = new Date(+(jwtInfo.exp + '000'));
        if (expDate < new Date() || this.web3.isLoggedIn() && !localStorage.getItem(StorageKey.USER_INFO)) {
          this.popupService.showColorPopup(COLOR_POPUP_TYPE.LOGOUT);
          this.userStateService.logoutWithoutRedirect();
          if (route.data['canAccess'] === 'allow-with-login') {
            return true;
          }
        }
        return isAuthenticatedCache || isAuthenticated;
    }
}
