import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TOKEN } from "@app/core/enums/token.enum";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject, map, take } from "rxjs";
import Web3 from "web3";

interface TokenBalance {
    matic: string | undefined;
    usdc: string | undefined;
}
@Injectable({ providedIn: 'root' })


export class PaymentService {

    constructor(private http: HttpClient,
                private web3: Web3AuthService) {}

    private _tokenBalance = new BehaviorSubject<TokenBalance>({matic: '0', usdc: '0'});

    get tokenBalance$() {
        return this._tokenBalance.asObservable();
    }

    updateBalance() {
        this.getUSDCBalance().then(usdcBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.usdc = usdcBalance;
            this._tokenBalance.next(tokenBalance);
        });
        this.getMaticBalance().then(maticBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.matic = maticBalance;
            this._tokenBalance.next(tokenBalance);
        });
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

    async getMaticBalance() {
        return await this.web3.getBalance();
    }

    async getUSDCBalance():Promise<string | undefined> {
        if (!this.web3.provider) return;
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();

        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0]
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const balance = await contract.methods.balanceOf(wallet).call();

        return balance;
    }

    async checkAddressValidity(address: string | undefined | null) {
        if(!this.web3.provider || !address) return;
        const web3 = new Web3(this.web3.provider as any);
        return web3.utils.isAddress(address);
    }

    async sendUSDC(address: string, amount: number) {
        if (!this.web3.provider) {
            console.log("provider not initialized yet");
            return;
        }
        const tx = await this.sendTransaction(address, amount);
        return tx;
    };

    async transferMatic(address: string, amount: number) {
        console.log('amountToSend',amount)
        const web3 = new Web3(this.web3.provider as any);
        const myWallet = await this.web3.getAccounts();

        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = await web3.eth.estimateGas({from: myWallet, to: address, gasPrice:  gasPrice});

        const convertedAmount = web3.utils.toWei(amount.toString());
        const amountToSend = +convertedAmount - (+gasPrice * gasLimit);
        console.log(web3.utils.fromWei(amountToSend.toString()))

        const receipt = await web3.eth.sendTransaction({
          from: myWallet,
          to: address,
          value: amountToSend,
          gasPrice: gasPrice,
        });
        return receipt;
    }
    async estimateMaticGasFee(to: string, amount: number) {
        if(!amount) return;
        const web3 = new Web3(this.web3.provider as any);
        const myWallet = await this.web3.getAccounts();
        const gasPrice = await web3.eth.getGasPrice();

        const transactionReceipt = {
            from: myWallet,
            to: to,
            gasPrice: gasPrice,
        };
        const gasLimit = await web3.eth.estimateGas(transactionReceipt);
        const fee = gasLimit * +gasPrice;
        const gasFee = web3.utils.fromWei(fee.toString());
        return gasFee;
    }

    claimUSDC = async () => {
        if (!this.web3.provider) return;
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();

        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0];
        console.log('account', wallet);
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const tx = await contract.methods.claim().send({
          from: wallet,
        //   maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
        //   maxFeePerGas: "200000000000"
        })
        return tx;
    }

    async getDecimals(token: TOKEN): Promise<number> {
        const web3 = new Web3(this.web3.provider as any);
        const contract = new web3.eth.Contract(GetTokensABI, this.getContractAddress(token));
        return await contract.methods.decimals().call();
    }

    private getContractAddress(token: TOKEN): string {
        if (token === TOKEN.MATIC) return '0x0000000000000000000000000000000000001010'
        if (token === TOKEN.USDC) return '0xB408CC68A12d7d379434E794880403393B64E44b'
        return '';
    }

    async estimateUSDCGasFee(to: string, amount: string) {
        const web3 = new Web3(this.web3.provider as any);
        const wallet = await this.web3.getAccounts();
        if(!amount) return;
        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const gasPrice = await contract.methods.transfer(to, amount).estimateGas({from: wallet});
        const gasFee = web3.utils.fromWei(gasPrice.toString());
        return gasFee;
    }

    async sendTransaction(to: string, amount: number) {
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();
        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0];
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const tx = await contract.methods.transfer(to, amount).send({
          from: wallet,
        //   maxPriorityFeePerGas: "150000000000", // Max priority fee per gas
        //   maxFeePerGas: "200000000000"
        })

        return tx;
      }


}
