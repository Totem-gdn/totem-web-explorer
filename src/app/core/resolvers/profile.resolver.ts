import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { forkJoin, Observable } from "rxjs";
import { Web3AuthService } from "../web3auth/web3auth.service";

@Injectable({ providedIn: 'root' })

export class ProfileResolver implements Resolve<any>
{
    constructor(private web3: Web3AuthService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>
    {
        // Fork join multiple API endpoint calls to wait all of them to finish
        return forkJoin([
            this.web3.get()
        ]);
    }
}