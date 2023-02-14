import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import Web3 from "web3";

@Injectable({ providedIn: 'root' })

export class SellAssetService {

    constructor(private web3: Web3AuthService) { }

    async transferNft() {
        if (!this.web3.provider) return;
        const wallet = await this.web3.getAccounts();
        const web3 = new Web3(this.web3.provider as any);
        const contractAddresses = {
            Avatar: environment.AVATAR_ETH_ADDRESS,
            Item: environment.ITEM_ETH_ADDRESS,
            Gem: environment.GEM_ETH_ADDRESS,
        }

        const contract = new web3.eth.Contract(GetTokensABI, contractAddresses.Item);
    }
}