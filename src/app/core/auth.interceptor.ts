import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Observable } from "rxjs";
import { StorageKey } from "./models/enums/storage-keys.enum";
import { BaseStorageService } from "./services/utils/base-storage.service";
import { Web3AuthService } from "./web3auth/web3auth.service";


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private web3: Web3AuthService,
    private baseStorageService: BaseStorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isAuth()) {
      if (request.url.includes(environment.TOTEM_BASE_API_URL) || request.url.includes(environment.TOTEM_FAUCET_API_URL)) {
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
    const authorization: string = `Bearer ${creds.userInfo.idToken}`;
    return request.clone({
        setHeaders: {
          Authorization: authorization,
          "X-App-PubKey": creds.key
        }
    })
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
