import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

interface CachedTotalItems {
    totalItems?: number;
    totalAvatars?: number;
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

   private  _cache = new BehaviorSubject<CachedTotalItems>({});

   totalCache$() {
    return this._cache.asObservable();
   }

    setItemCache(itemType: string, value: number) {
        const cache = this._cache.getValue();
        if(itemType == 'avatar') cache.totalAvatars = value;
        if(itemType == 'item') cache.totalItems = value;
        if(itemType == 'gem') cache.totalGems = value;
        if(itemType == 'game') cache.totalGames = value;
        if(itemType == 'fav_avatar') cache.fav_totalAvatars = value;
        if(itemType == 'fav_item') cache.fav_totalItems = value;
        if(itemType == 'fav_gem') cache.fav_totalGems = value;
        if(itemType == 'fav_game') cache.fav_totalGames = value;

        this._cache.next(cache);
    }

    getItemCache(itemType: string) {
        const cache = this._cache.getValue();
        if(itemType == 'avatar') return cache.totalAvatars;
        if(itemType == 'item') return cache.totalItems;
        if(itemType == 'gem') return cache.totalGems;
        if(itemType == 'game') return cache.totalGames;
        if(itemType == 'fav_avatar') return cache.fav_totalAvatars;
        if(itemType == 'fav_item') return cache.fav_totalItems;
        if(itemType == 'fav_gem') return cache.fav_totalGems;
        if(itemType == 'fav_game') return cache.fav_totalGames;
        return null;
    }
}