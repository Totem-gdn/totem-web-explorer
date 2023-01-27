import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { COLOR_POPUP_TYPE } from "./models/enums/popup.enum";
import { StorageKey } from "./models/enums/storage-keys.enum";
import { UserStateService } from "./services/auth.service";
import { PopupService } from "./services/states/popup-state.service";
import { BaseStorageService } from "./services/utils/base-storage.service";
import { Web3AuthService } from "./web3auth/web3auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private web3: Web3AuthService,
    private baseStorageService: BaseStorageService,
    private userService: UserStateService,
    private popupService: PopupService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuth()) {
      if (
        request.url.includes(environment.TOTEM_BASE_API_URL) ||
        request.url.includes(environment.TOTEM_FAUCET_API_URL) ||
        request.url.includes(environment.TOTEM_API_GDN_URL)
        // request.url.includes(environment.TOTEM_STATIC_API_URL)
      ) {
        return next.handle(this.transformRequest(request));
      }
      //if (request.url.includes('s3')) {
      //  return next.handle(this.transformRequest2(request));
      //}
    }
    return next.handle(request);
  }

  transformRequest(request: HttpRequest<any>) {
    let creds: any = JSON.parse(localStorage.getItem(StorageKey.USER_INFO)!);

    if(this.web3.isLoggedIn() && !creds) {
      console.log('CALLED INSIDE THE INTERCEPOTR');
      this.popupService.showColorPopup(COLOR_POPUP_TYPE.LOGOUT);
      this.userService.logoutWithoutRedirect();
    }

    const authorization: string = `Bearer ${creds.userInfo.idToken}`;
    if (request.url.includes(environment.TOTEM_BASE_API_URL)) {
      return request.clone({
        setHeaders: {
          Authorization: authorization,
          'X-App-PubKey': creds?.key
        }
      })
    } else {
      return request.clone({
        setHeaders: {
          Authorization: `${authorization} ${creds.key}`
        }
      })
    }
  }

  isAuth(): boolean {
    const isAuthenticated = this.web3.isLoggedIn();

    const isAuthenticatedCache =
      !!(JSON.parse(this.baseStorageService.getItem(StorageKey.OPEN_LOGIN)!)?.idToken)
      &&
      !!(this.baseStorageService.getItem(StorageKey.ADAPTER));

    return isAuthenticatedCache || isAuthenticated;
  }

}
