import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import { SearchParamsModel } from "../model/search-params.model";
import { BehaviorSubject, concatMap, map, Observable, switchMap, take, tap } from "rxjs";
import Web3 from "web3";
import { ApiResponse, APIResponseMeta } from '@app/core/models/interfaces/api-response.interface';
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { DNAParserService } from "../utils/dna-parser.service";
const { DNAParser } = require('totem-dna-parser');


interface TotalAssets {
    avatars?: APIResponseMeta;
    items?: APIResponseMeta;
}
@Injectable({ providedIn: 'root' })

export class AssetsService {
    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient,
                private dnaService: DNAParserService
    ) { }

    private _totalAssets = new BehaviorSubject<TotalAssets>({});
    set totalAssets(totalAssets: TotalAssets) { this._totalAssets.next(totalAssets) }
    get totalAssets() { return this._totalAssets.getValue() }
    get totalAssets$() { return this._totalAssets.asObservable() }

    fetchAssets(type: ASSET_TYPE, page: number, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST) {
        return this.http.get<ApiResponse<AssetInfo[]>>(`${this.baseUrl}/assets/${type}s?list=${list}&page=${page}`)
            .pipe(tap(assets => {

                const totalAssets = this.totalAssets;
                if(type == ASSET_TYPE.AVATAR) totalAssets.avatars = assets.meta;
                if(type == ASSET_TYPE.ITEM) totalAssets.items = assets.meta;
                this.totalAssets = totalAssets;

            }));
    }

    fetchAsset(id: string, type: ASSET_TYPE) {
        return this.http.get<AssetInfo>(`${this.baseUrl}/assets/${type}s/${id}`).pipe(map(asset =>  {
            asset.rarity = asset.tokenId % 100;
            return asset;
        }));
    }

    getAssetsByName(type: ASSET_TYPE, word: string): Observable<any[]> {
        if (this.baseUrl == 'https://api.totem-explorer.com') {
            return this.http.get<any>(`${this.baseUrl}/assets/${type}s?search=${word}`);
        } else {
            return this.http.get<any>(`${this.baseUrl}/assets/${type}s?search=${word}`)
            .pipe(map(assets => assets.data));
        }

    }

    // formatAssets(assets: AssetInfo[], assetType: string) {
    //     const formattedAssets: AssetInfo[] = [];

    //     for (let asset of assets) {
    //         const formattedAsset = this.formatAsset(asset, assetType);
    //         formattedAssets.push(formattedAsset);
    //     }
    //     return formattedAssets;
    // }

    // formatAsset(asset: AssetInfo, assetType: string) {
    //     const parser = new DNAParser()
    //     asset.rarity = parser.getItemRarity(asset?.tokenId);
    //     asset.assetType = assetType;
    //     return asset;
    // }

}
