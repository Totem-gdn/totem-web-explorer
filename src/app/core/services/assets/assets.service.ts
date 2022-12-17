import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import { SearchParamsModel } from "../model/search-params.model";
import { BehaviorSubject, map, Observable, take, tap } from "rxjs";
import Web3 from "web3";
import { CacheService } from "./cache.service";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
const { DNAParser } = require('totem-dna-parser');

interface AssetsHTTPResponse {
    data?: AssetInfo[],
    meta?: {
        page: number;
        perPage: number;
        total: number;
    }
}
@Injectable({ providedIn: 'root' })

export class AssetsService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient,
    ) { }


    updateAssets(type: ASSET_TYPE, page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST) {
        if(this.baseUrl == 'https://api.totem-explorer.com') {
            return this.http.get<any>(`${this.baseUrl}/assets/${type}s?list=${list}&page=${page}`).pipe(
                // map(assets => assets.data),
                tap(assets => {
                    const formatedAssets = this.formatAssets(assets, type);

                }));
        } else {
            return this.http.get<any>(`${this.baseUrl}/assets/${type}s?list=${list}&page=${page}`).pipe(
                map(assets => assets.data),
                tap(assets => {
                    const formatedAssets = this.formatAssets(assets, type);
                }));
        }

    }

    fetchAssets(type: ASSET_TYPE, page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST) {
        if (this.baseUrl == 'https://api.totem-explorer.com') {
            return this.http.get<AssetsHTTPResponse>(`${this.baseUrl}/assets/${type}s?list=${list}&page=${page}`);
        }
        return this.http.get<AssetsHTTPResponse>(`${this.baseUrl}/assets/${type}s?list=${list}&page=${page}`);
    }
    fetchAsset(id: string, type: ASSET_TYPE) {
        return this.http.get<AssetInfo>(`${this.baseUrl}/assets/${type}s/${id}`);
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

    getAssetsByName(type: ASSET_TYPE, word: string): Observable<any[]> {
        if (this.baseUrl == 'https://api.totem-explorer.com') {
            return this.http.get<any>(`${this.baseUrl}/assets/${type}s?search=${word}`);
        } else {
            return this.http.get<any>(`${this.baseUrl}/assets/${type}s?search=${word}`)
            .pipe(map(assets => assets.data));
        }

    }

}
