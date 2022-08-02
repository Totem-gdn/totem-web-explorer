import { Injectable } from "@angular/core";

import { AssetTransfersCategory, AssetTransfersOrder, createAlchemyWeb3 } from"@alch/alchemy-web3";
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { from, map, take } from "rxjs";


const ALCHEMY_KEY = environment.ALCHEMY_KEY;
const web3 = createAlchemyWeb3(ALCHEMY_KEY)

@Injectable({ providedIn: 'root' })

export class AlchemyApiService {

    constructor(private http: HttpClient) {}

    async getNft(wallet: string) {

       return web3.alchemy.getNfts({ owner: wallet });

    }

    async getTransactionHistory(wallet: string) {
        let transactions: any[] = [];

        const from = await web3.alchemy.getAssetTransfers({
            fromAddress: wallet,
            category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155],
        })      

        const to = await web3.alchemy.getAssetTransfers({
            toAddress: wallet,
            category: [AssetTransfersCategory.EXTERNAL, AssetTransfersCategory.ERC20, AssetTransfersCategory.ERC721, AssetTransfersCategory.ERC1155],
        })     

        transactions = transactions.concat(to.transfers);
        transactions = transactions.concat(from.transfers);

        return transactions;
    }
    

}