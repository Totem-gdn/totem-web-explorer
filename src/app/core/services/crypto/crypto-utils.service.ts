import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { CONTRACT_ADDRESS } from "@app/core/models/enums/contract-address.enum";
import { TOKEN } from "@app/core/models/enums/token.enum";
import { TokenBalance } from "@app/core/models/interfaces/token-balance.modle";
import { GetTokensABI, TotemTokenABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { log } from "@web3auth/base";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";


@Injectable({ providedIn: 'root' })

export class CryptoUtilsService
{
    constructor(private web3: Web3AuthService) {}

    private _tokenBalance = new BehaviorSubject<TokenBalance>({ matic: '0', usdc: '0', totem: '0' });

    get tokenBalance$() {
        return this._tokenBalance.asObservable();
    }

    // async burn() {
    //     const web3 = new Web3(this.web3Auth.provider as any);
    //     const wallet = await this.web3Auth.getAccounts();
    //     const ABI = CommonFiles.totem_asset_abi;

    //     const contract = new web3.eth.Contract(ABI, environment.AVATAR_ETH_ADDRESS);
    //     const ids = await contract.methods.balanceOf(wallet).call();
    //     for(let i = 0; i < ids; i++) {
    //         const id = await contract.methods.tokenOfOwnerByIndex(wallet, i).call();
    //         await contract.methods.safeTransferFrom(wallet, '0x000000000000000000000000000000000000dEaD', id).send({from: wallet})
    //     }

    //     const contract1 = new web3.eth.Contract(ABI, environment.ITEM_ETH_ADDRESS);
    //     const ids1 = await contract1.methods.balanceOf(wallet).call();
    //     for(let i = 0; i < ids1; i++) {
    //         const id = await contract1.methods.tokenOfOwnerByIndex(wallet, i).call();
    //         await contract1.methods.safeTransferFrom(wallet, '0x000000000000000000000000000000000000dEaD', id).send({from: wallet})
    //     }

    //     // const ids = await contract.methods.tokenOfOwnerByIndex(wallet).call();

    // }

    updateBalance() {
        this.getTOTBalance().then(totemBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.totem = totemBalance;
            this._tokenBalance.next(tokenBalance);
        });
        this.getUSDCBalance().then(usdcBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.usdc = usdcBalance;
            this._tokenBalance.next(tokenBalance);
        });
        /* this.getMaticBalance().then(maticBalance => {
            let tokenBalance = this._tokenBalance.getValue();
            tokenBalance.matic = maticBalance;
            this._tokenBalance.next(tokenBalance);
        }); */
    }

    async checkAddressValidity(address: string | undefined | null) {
        if (!this.web3.provider || !address) return;
        const web3 = new Web3(this.web3.provider as any);
        return web3.utils.isAddress(address);
    }

    async getDecimals(token: TOKEN): Promise<number> {
        const web3 = new Web3(this.web3.provider as any);
        const address = token == TOKEN.MATIC ? CONTRACT_ADDRESS.MATIC : CONTRACT_ADDRESS.USDC;
        const contract = new web3.eth.Contract(GetTokensABI, address);
        return await contract.methods.decimals().call();
    }

    async estimateMaticGasFee(to: string, amount: number) {
        if (!amount) return;
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
    async estimateUSDCGasFee(to?: string, amount?: string) {
        if(to == undefined || amount == undefined) return;
        const web3 = new Web3(this.web3.provider as any);
        const wallet = await this.web3.getAccounts();

        const contractAddress ='0xB408CC68A12d7d379434E794880403393B64E44b'
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);


        const contractGas = await contract.methods.transfer(to, amount).estimateGas({ from: wallet });
        const gasPrice = await web3.eth.getGasPrice();
        const fee = +contractGas * +gasPrice;
        const gasFee = web3.utils.fromWei(fee.toString());
        return gasFee;
    }

    async getMaticBalance() {
        return await this.web3.getBalance();
    }

    async getTOTBalance(): Promise<string> {
        const web3 = new Web3(this.web3.provider as any);
        const web3Totem = new Web3(new Web3.providers.HttpProvider("https://polygon-mainnet.g.alchemy.com/v2/8R3Mg6KDymXjWk6vwzinEkqwwmgWduZD"));
        //const web3 = new Web3(new Web3.providers.WebsocketProvider('wss://polygon-mumbai.g.alchemy.com/v2/pN97VGYBgynfw0vHtCfKpqyA1nkvxkbx'));
        const accounts = await web3.eth.getAccounts();
        const minABI: any = [
          // balanceOf
          {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256"}],
            type: "function",
          },
        ];
        const tokenAddress = "0xEc5304296d6FdD0c88ADE4DA3E52A45F05F65125";
        //const walletAddress = "0x02935c22b2ae786698c1283d10cf70212b9babf8";
        console.log(`accs:`, accounts);
        const contract = new web3Totem.eth.Contract(minABI, tokenAddress);
        const result = await contract.methods.balanceOf(accounts[0]).call();

        //const resultInEther = web3.utils.fromWei(result, "ether");

        console.log(`Balance in wei: ${result}`);

        //console.log(`Balance in ether: ${resultInEther}`);
        return result;
    }

    async getUSDCBalance():Promise<string> {
        const web3 = new Web3(this.web3.provider as any);
        const accounts = await web3.eth.getAccounts();

        const contractAddress = '0xB408CC68A12d7d379434E794880403393B64E44b';
        const wallet = accounts[0]
        const tokenContract = GetTokensABI;
        const contract = new web3.eth.Contract(tokenContract, contractAddress);

        const balance = await contract.methods.balanceOf(wallet).call();

        return balance;
    }
}
