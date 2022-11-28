import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { GetTokensABI } from "@app/core/web3auth/abi/getTokens.abi";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import Web3 from "web3";

@Injectable({ providedIn: 'root' })

export class SellAssetService {

    constructor(private web3: Web3AuthService) { }

    async transferNft() {
        if (!this.web3.provider) return;
        const wallet = await this.web3.getAccounts();
        const web3 = new Web3(this.web3.provider as any);
        const contractAddresses = {
            Avatar: "0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35",
            Item: "0xfC5654489b23379ebE98BaF37ae7017130B45086",
            Gem: "0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5"
        }

        const contract = new web3.eth.Contract(GetTokensABI, contractAddresses.Item);
    }
}