import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AssetInfo, AssetTypes } from "@app/core/models/interfaces/asset-info.model";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { environment } from "@env/environment";
import { SearchParamsModel } from "../model/search-params.model";
import { BehaviorSubject, concat, concatMap, forkJoin, map, Observable, of, switchMap, take, tap, throwError } from "rxjs";
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

    fetchAssets(type: AssetTypes, page: number, list: 'latest' | 'popular' = 'latest', owner: string | undefined = undefined) {

        const url = owner ? `${this.baseUrl}/assets/${type}s?list=${list}&page=${page}&owner=${owner}` : `${this.baseUrl}/assets/${type}s?list=${list}&page=${page}`

        return this.http.get<ApiResponse<AssetInfo[]>>(url)
            .pipe(tap(assets => {
                this.handleAssets(type, assets.data);

                const totalAssets = this.totalAssets;
                if (type == ASSET_TYPE.AVATAR) {
                    totalAssets.avatars = assets.meta;
                }
                if (type == ASSET_TYPE.ITEM) totalAssets.items = assets.meta;
                this.totalAssets = totalAssets;

            }));
    }

    fetchMultiplePages(type: AssetTypes,fromPage: number, toPage: number, list: 'latest' | 'popular' = 'latest', owner: string | undefined = undefined) {
        if(fromPage < 1 && fromPage > toPage) return of ();
        const obsArray = [];
        for(let i = fromPage; i < toPage; i++) {
            obsArray.push(this.fetchAssets(type, i, list).pipe(tap(assets => {
                this.handleAssets(type, assets.data);
            })))
        }


        return forkJoin([...obsArray]);
    }

    totalAssetsByWallet(wallet: string, type: AssetTypes) {
        return this.http.get<any>(`${this.baseUrl}/assets/${type}s?owner=${wallet}`)
    }

    handleAssets(type: AssetTypes, assets: AssetInfo[]) {
        for (let asset of assets) {
            asset.assetType = type;
        }
    }
    getAssetsByFilter(type: ASSET_TYPE, filter: string, page: number = 1, list: 'latest' | 'popular' = 'latest') {
        return this.http.get<any>(`${this.baseUrl}/assets/${type}s?page=${page}&list=${list}&search=${filter}`)
            .pipe(map(assets => assets.data));

    }

    fetchAsset(id: string, type: ASSET_TYPE) {
        return this.http.get<AssetInfo>(`${this.baseUrl}/assets/${type}s/${id}`).pipe(map(asset => {
            asset.rarity = asset.tokenId % 100;
            return asset;
        }));
    }

}
