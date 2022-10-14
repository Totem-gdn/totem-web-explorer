import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
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

    async transferToken() {
        // const web3 = new Web3(this.provider as any)
        // const contractAddress = '0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35';
        // const assetsABI = AssetsABI;
        // const contract = new web3.eth.Contract(assetsABI, contractAddress);
        // const transfer = await contract.methods.safeTransferFrom('0x2BF88b64F7cf2A21B2Cb5866e7d4649A123D67f4','0x554348446EC3271aC45C939D086C23dEE34C479b', '83')
        // .send({from: '0x2BF88b64F7cf2A21B2Cb5866e7d4649A123D67f4'})
        // console.log('transfer', transfer);
        // return true;
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
        const wallet = accounts[0];
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
