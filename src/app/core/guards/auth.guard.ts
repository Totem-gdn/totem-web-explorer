import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from "@angular/router";
import { UserStateService } from "../services/user-state.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private userStateService: UserStateService,
        private router: Router) { }
    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean | Promise<boolean> {
        const isAuthenticated = this.userStateService.isLoggedIn();
        if (!isAuthenticated) {
            this.router.navigate(['/home']);
        }
        return isAuthenticated;
    }
}
