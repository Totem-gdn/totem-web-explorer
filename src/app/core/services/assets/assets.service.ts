import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import { BehaviorSubject, tap } from "rxjs";
import { SearchParamsModel } from "../model/search-params.model";
import { CacheService } from "./cache.service";
const { DNAParser } = require('totem-dna-parser');

@Injectable({ providedIn: 'root' })

export class AssetsService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient,
        private web3: Web3AuthService,
        private cacheService: CacheService
    ) { }

    private _avatars = new BehaviorSubject<AssetInfo[] | null>(null);
    private _gems = new BehaviorSubject<AssetInfo[] | null>(null);
    private _items = new BehaviorSubject<AssetInfo[] | null>(null);
    private _avatar = new BehaviorSubject<AssetInfo | null>(null);
    private _gem = new BehaviorSubject<AssetInfo | null>(null);
    private _item = new BehaviorSubject<AssetInfo | null>(null);

    get avatars$() { return this._avatars.asObservable() }
    get items$() { return this._items.asObservable() }
    get gems$() { return this._gems.asObservable() }
    get avatar$() { return this._avatar.asObservable() }
    get item$() { return this._item.asObservable() }
    get gem$() { return this._gem.asObservable() }

    assset$(type: string) {
        if (type == 'avatar') return this.avatar$;
        if (type == 'item') return this.item$;
        return this.gem$;
    }


    set avatars(value: any) { this._avatars.next(value) }
    set items(value: any) { this._items.next(value) }
    set gems(value: any) { this._gems.next(value) }
    set avatar(value: any) { this._avatar.next(value) }
    set item(value: any) { this._item.next(value) }
    set gem(value: any) { this._gem.next(value) }

    updateAssets(type: string, page: number, list: string, params?: SearchParamsModel) {
        return this.http.get<any[]>(`${this.baseUrl}/assets/${type}s?list=${list}&page=${page}&search=${params?.search}`).pipe(tap(assets => {
            const formatedAssets = this.formatAssets(assets, type);

            if (type == 'avatar') this._avatars.next(formatedAssets);
            if (type == 'gem') this._gems.next(formatedAssets);
            if (type == 'item') this._items.next(formatedAssets);
        }));
    }

    updateAsset(id: string, type: string) {

        return this.http.get<AssetInfo>(`${this.baseUrl}/assets/${type}s/${id}`).pipe(tap(asset => {
            const formattedAsset = this.formatAsset(asset, type);

            if (type == 'item') this._item.next(formattedAsset);
            if (type == 'avatar') this._avatar.next(formattedAsset);
            if (type == 'gem') this._gem.next(formattedAsset);
        }));
    }

    formatAssets(assets: AssetInfo[], assetType: string) {
        const formattedAssets: AssetInfo[] = [];

        for (let asset of assets) {
            const formattedAsset = this.formatAsset(asset, assetType);
            formattedAssets.push(formattedAsset);
        }
        return formattedAssets;
    }

    formatAsset(asset: AssetInfo, assetType: string) {
        const parser = new DNAParser()
        asset.rarity = parser.getItemRarity(asset?.tokenId);
        asset.assetType = assetType;
        return asset;
    }


    reset() {
        this._avatars.next(null);
        this._gems.next(null);
        this._items.next(null);
        this._avatar.next(null);
        this._gem.next(null);
        this._item.next(null);
    }
}
