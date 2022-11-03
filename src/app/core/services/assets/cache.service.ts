import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

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

@Injectable({
    providedIn: 'root'
})

export class CacheService {

    private _cache = new BehaviorSubject<CachedTotalItems>({});

    totalCache$() {
        return this._cache.asObservable();
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