import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { environment } from "@env/environment";
import Web3 from "web3";
import { Web3AuthService } from "../../web3auth/web3auth.service";

@Injectable({
  providedIn: 'root'
})

export class TransactionsService {

  faucetUrl: string = environment.TOTEM_FAUCET_API_URL;

  constructor(private web3: Web3AuthService, private http: HttpClient,
    private messageService: SnackNotifierService) { }

  getMaticViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas`);
  }

  getMaticBalanceViaFaucet() {

    return this.http.get<any>(`${this.faucetUrl}/gas/balance`);
  }



}
