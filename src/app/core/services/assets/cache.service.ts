import { Injectable } from "@angular/core";
import { AssetsABI } from "@app/core/web3auth/abi/assetsABI";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";


interface CachedTotalItems {
    totalItems?: number;
    totalAvatars?: number;
    totalRareGems?: number;
    totalRareItems?: number;
    totalRareAvatars?: number;
    totalUniqueGems?: number;
    totalUniqueItems?: number;
    totalUniqueAvatars?: number;
    totalGems?: number;
    totalGames?: number;
    fav_totalItems?: number;
    fav_totalAvatars?: number;
    fav_totalGems?: number;
    fav_totalGames?: number;
}

interface TotalAssets {
    avatar?: string;
    item?: string;
    gem?: string;
}

// interface TotalFav {
//     avatars?: {
//         total?: number;
//         rare?: number;
//         unique?: number;
//     }
//     items?: {
//         total?: number;
//         rare?: number;
//         unique?: number;
//     }
//     gems?: {
//         total?: number;
//         rare?: number;
//         unique?: number;
//     }
// }

@Injectable({
    providedIn: 'root'
})

export class CacheService {

    private _cache = new BehaviorSubject<CachedTotalItems>({});
    private _totalAssetsCache = new BehaviorSubject<TotalAssets>({});
    constructor(private web3: Web3AuthService) {}

    totalCache$() {
        return this._cache.asObservable();
    }

    totalAssets$() {
        return this._totalAssetsCache.asObservable();
    }

    totalByAssetType(type: string, assets: any[]) {
        if(!assets) return;
        let rare = 0;
        let unique = 0;
        for(let asset of assets) {
            const id = asset.tokenId;
            if(id % 100 >= 70 && id % 100 < 90) rare++;
            if(id % 100 > 90) unique++;
        }
        this.setItemCache(`rare_${type}`, rare);
        this.setItemCache(`unique_${type}`, unique);
    }

    async cacheTotalByAssetType(type: string) {
        if(!this.web3.provider) {
            return;
        }
        if(type == 'game') return;
        const web3 = new Web3(this.web3.provider as any);
        let contractAddress = '';
        const cache = this._totalAssetsCache.getValue();
        const contractAddresses = {
            Avatar: "0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35",
            Item: "0xfC5654489b23379ebE98BaF37ae7017130B45086",
            Gem: "0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5"
        }
        if(type == 'item') contractAddress = contractAddresses.Item;
        if(type == 'avatar') contractAddress = contractAddresses.Avatar;
        if(type == 'gem') contractAddress = contractAddresses.Gem;
        const contract = new web3.eth.Contract(AssetsABI, contractAddress);
        const total = await contract.methods.totalSupply().call();
        if(type == 'item') cache.item = total;
        if(type == 'avatar') cache.avatar = total;
        if(type == 'gem') cache.gem = total;
        this._totalAssetsCache.next(cache);
    }

    setItemCache(itemType: string, value: number) {
        const cache = this._cache.getValue();
        if (itemType == 'avatar') cache.totalAvatars = value;
        if (itemType == 'item') cache.totalItems = value;
        if (itemType == 'gem') cache.totalGems = value;
        if (itemType == 'rare_avatar') cache.totalRareAvatars = value;
        if (itemType == 'rare_item') cache.totalRareItems = value;
        if (itemType == 'rare_gem') cache.totalRareGems = value;
        if (itemType == 'unique_avatar') cache.totalUniqueAvatars = value;
        if (itemType == 'unique_item') cache.totalUniqueItems = value;
        if (itemType == 'unique_gem') cache.totalUniqueGems = value;

        if (itemType == 'game') cache.totalGames = value;
        if (itemType == 'fav_avatar') cache.fav_totalAvatars = value;
        if (itemType == 'fav_item') cache.fav_totalItems = value;
        if (itemType == 'fav_gem') cache.fav_totalGems = value;
        if (itemType == 'fav_avatar') cache.fav_totalAvatars = value;
        if (itemType == 'fav_item') cache.fav_totalItems = value;
        if (itemType == 'fav_gem') cache.fav_totalGems = value;
        if (itemType == 'fav_avatar') cache.fav_totalAvatars = value;
        if (itemType == 'fav_item') cache.fav_totalItems = value;
        if (itemType == 'fav_gem') cache.fav_totalGems = value;
        if (itemType == 'fav_game') cache.fav_totalGames = value;

        this._cache.next(cache);
    }

    getItemCache(itemType: string) {
        const cache = this._cache.getValue();
        if (itemType == 'avatar') return cache.totalAvatars;
        if (itemType == 'item') return cache.totalItems;
        if (itemType == 'gem') return cache.totalGems;
        if (itemType == 'rare_avatar') return cache.totalRareAvatars;
        if (itemType == 'rare_item') return cache.totalRareItems;
        if (itemType == 'rare_gem') return cache.totalRareGems;
        if (itemType == 'unique_avatar') return cache.totalUniqueAvatars;
        if (itemType == 'unique_item') return cache.totalUniqueItems;
        if (itemType == 'unique_gem') return cache.totalUniqueGems;

        if (itemType == 'game') return cache.totalGames;
        if (itemType == 'fav_avatar') return cache.fav_totalAvatars;
        if (itemType == 'fav_item') return cache.fav_totalItems;
        if (itemType == 'fav_gem') return cache.fav_totalGems;
        if (itemType == 'fav_game') return cache.fav_totalGames;
        return null;
    }
}