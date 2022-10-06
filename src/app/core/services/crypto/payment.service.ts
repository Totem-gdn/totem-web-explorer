import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { SafeEventEmitterProvider } from "@web3auth/base";
import { map, take } from "rxjs";
import Web3 from "web3";


@Injectable({ providedIn: 'root' })


export class PaymentService {


    constructor(private http: HttpClient,
                private web3: Web3AuthService) {

    }

    getPaymentHistory() {
        return this.http.get<any>('https://payment.totem.gdn/payments').pipe(
            take(1),

        )
    }
    getAssets() {
        return this.http.get<any>('https://payment.totem.gdn/assets').pipe(
            take(1),
            map(assets => assets.assets));
    }
    getPaymentInfo(asset: string) {
        return this.http.get<any>(`https://payment.totem.gdn/assets/${asset}/payment-info`).pipe(take(1));
    }


    getTokenBalance = async () => {
        if (!this.web3.provider) {
            console.log("provider not initialized yet");
            return;
        }
        console.log('CheckBalance');
        const checkBalance = await this.tokenBalance();
        return checkBalance;
    }

    buyItem = async (address: string, amount: number) => {
        if (!this.web3.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const tx = await this.sendTransaction(address, amount);
        return tx;
    };

    getTokens = async () => {
        if (!this.web3.provider) {
            console.log("provider not initialized yet");
            return;
        }
        console.log('Get tokens');
        const getTokens = await this.claimTokens();
        return getTokens;
    }

    async tokenBalance() {
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();

        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0]
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const tx = await contract.methods.balanceOf(wallet).call()
        return tx;
      }

      async claimTokens() {
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();

        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0]
        console.log('account', wallet);
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const tx = await contract.methods.claim().send({
          from: wallet,
          maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
          maxFeePerGas: "200000000000"
        })
        return tx;
      }

    async sendTransaction(to: string, amount: number) {
        // this.provider = (this.web3.provider as SafeEventEmitterProvider);
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();
        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0];
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const tx = await contract.methods.transfer(to, amount).send({
          from: wallet,
          maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
          maxFeePerGas: "200000000000"
        })

        return tx;
      }


}
