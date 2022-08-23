import { Injectable } from "@angular/core";
import { Web3AuthService } from "../../web3auth/web3auth.service";

@Injectable({
    providedIn: 'root'
})

export class TransactionsService {

    constructor(private web3: Web3AuthService) {}


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