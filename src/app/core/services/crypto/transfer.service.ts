
import { Injectable } from "@angular/core";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import Web3 from "web3";
import { CryptoUtilsService } from "./crypto-utils.service";


@Injectable({ providedIn: 'root' })


export class TransferService {

    constructor(
        private web3: Web3AuthService,
        private snackService: SnackNotifierService,
        private cryptoUtils: CryptoUtilsService,
    ) { }


    async transferMatic(address: string, amount: number) {
        const web3 = new Web3(this.web3.provider as any);
        const myWallet = await this.web3.getAccounts();
        const gasPrice = await web3.eth.getGasPrice();
        const gasLimit = await web3.eth.estimateGas({ from: myWallet, to: address, gasPrice: gasPrice });
        const convertedAmount = web3.utils.toWei(amount.toString());
        const amountToSend = +convertedAmount - (+gasPrice * +gasLimit);

        const receipt = await web3.eth.sendTransaction({
            from: myWallet,
            to: address,
            value: amountToSend,
            gasPrice: gasPrice,
        });
        return receipt;
    }

    async transferUSDC(to: string, amount: string) 
    {
        const web3 = new Web3(this.web3.provider as any);
        const wallet = await this.web3.getAccounts();

        const maticBalance = (await web3.eth.getAccounts())[0];
        const fee = web3.utils.toWei(await this.cryptoUtils.estimateUSDCGasFee(to, amount));

        if(+maticBalance < +fee) this.snackService.open('Unsifficient MATIC balance');

        const contractAddress = '0xB408CC68A12d7d379434E794880403393B64E44b';
        const ABI = GetTokensABI;
        const contract = new web3.eth.Contract(ABI, contractAddress);

        const tx = await contract.methods.transfer(to, amount).send({
            from: wallet,
        })
        return tx;
    }

}
