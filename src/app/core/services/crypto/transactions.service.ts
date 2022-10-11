import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { Web3AuthService } from "../../web3auth/web3auth.service";

@Injectable({
    providedIn: 'root'
})

export class TransactionsService {

    faucetUrl: string = environment.TOTEM_FAUCET_API_URL;

    constructor(private web3: Web3AuthService, private http: HttpClient) {}

    getMaticViaFaucet() {
      console.log('GAS REQUEST');

      return this.http.get<any>(`${this.faucetUrl}/gas`);
    }

    getMaticBalanceViaFaucet() {
      console.log('GAS REQUEST');

      return this.http.get<any>(`${this.faucetUrl}/gas/balance`);
    }
    // getTokens = async () => {
    //     if (!this.web3.provider) {
    //         console.log("provider not initialized yet");
    //         return;
    //     }
    //     console.log('Get tokens');
    //     const rpc = new RPC(this.provider);
    //     const getTokens = await rpc.getTokens();
    //     return getTokens;
    // }
}
