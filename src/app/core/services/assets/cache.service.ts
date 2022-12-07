import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";



@Injectable({
    providedIn: 'root'
})

export class CacheService {


}