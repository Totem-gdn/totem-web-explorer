import { Injectable } from "@angular/core";

import { AssetTransfersCategory, AssetTransfersOrder, createAlchemyWeb3 } from "@alch/alchemy-web3";
import { environment } from "@env/environment";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, from, map, publishReplay, shareReplay, take } from "rxjs";
const ALCHEMY_KEY = environment.ALCHEMY_KEY;
//
import { Alchemy, Network } from "alchemy-sdk";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import Web3 from "web3";
import { CacheService } from "../assets/cache.service";
// const alchKeenvironment.ALCHEMY_KEY
const settings = {
    // apiKey: ALCHEMY_KEY, // Replace with your Alchemy API Key.
    network: Network.MATIC_MUMBAI, // Replace with your network.
  };
const alchemy = new Alchemy(settings);



const web3 = createAlchemyWeb3(ALCHEMY_KEY)


@Injectable({ providedIn: 'root' })

export class AlchemyService {

    constructor(private http: HttpClient,
                private cacheService: CacheService) { }


    getNfts(wallet: string) {
        return from(web3.alchemy.getNfts({ owner: wallet, })).pipe(
            take(1),
            map(nfts => this.nftsHandler(nfts.ownedNfts)));
    }

    nftsHandler(nfts: any) {
        console.log(nfts);
        const formattedNfts: any[] = [];
        for (let nft of nfts) {
            // if(nft.title == '') continue;
            nft.timeLastUpdated = new Date(nft.timeLastUpdated).toLocaleDateString();
            formattedNfts.push(nft);
        }
        const sortedNfts = formattedNfts.sort(function (a, b): any {
            return Date.parse(a.timeLastUpdated) - Date.parse(b.timeLastUpdated);

        });
        return sortedNfts.reverse();
    }

    // getUserTotalItems(wallet: string) {
    //     return this.getNfts(wallet).pipe(
    //         map(nfts => {
    //             let totalAvatars = 0;
    //             let totalItems = 0;
    //             let totalGems = 0;

    //             nfts.forEach(nft => {
    //                 if (nft.contractMetadata.name === 'Avatar') totalAvatars++;
    //                 if (nft.contractMetadata.name === 'Item') totalItems++;
    //                 if (nft.contractMetadata.name === 'Gem') totalGems++;
    //             })
    //             console.log('total items ')
    //             const cache = this.totalItems.getValue();
    //             cache.totalAvatars = totalAvatars;
    //             cache.totalItems = totalItems;
    //             cache.totalGems = totalGems;
    //             this.totalItems.next(cache);
    //         })
    //     )
    // }
    async updateTokenBalance() {

    }

    assetAddress(assetType: string)  {
        if(assetType == 'avatar') return "0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35";
        if(assetType == 'item') return "0xfC5654489b23379ebE98BaF37ae7017130B45086";
        if(assetType == 'gem') return "0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5";
        return '';
    };

    async getAssetsIds(assetType: string, wallet: string) {
        // const accounts = await web3.eth.getAccounts();
        const contractAddress = this.assetAddress(assetType);
        const assetsABI = AssetsABI;
        const contract = new web3.eth.Contract(assetsABI, contractAddress);
    
        const ids: any[] = [];
        const balance = await contract.methods.balanceOf(wallet).call();
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.methods.tokenOfOwnerByIndex(wallet, i).call();
          ids.push({id: {tokenId: tokenId}});
        }
        this.cacheService.setItemCache(assetType, ids.length);
        return ids;
      }

    async getNftMetadata(nft: any) {
        return web3.alchemy.getNftMetadata({ contractAddress: nft, tokenId: '0' });
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
