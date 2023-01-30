import { Injectable } from "@angular/core";
import { environment } from "@env/environment.local";
import { BehaviorSubject, combineLatest, map, Observable, take } from "rxjs";
import { ASSET_TYPE } from "../models/enums/asset-types.enum";
import { ASSET_PARAM_LIST } from "../models/enums/params.enum";
import { ApiResponse } from "../models/interfaces/api-response.interface";
import { AssetInfo, AssetTypes } from "../models/interfaces/asset-info.model";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";
import { AssetsService } from "../services/assets/assets.service";
import { GamesService } from "../services/assets/games.service";


@Injectable({ providedIn: 'root' })

export class MyAssetsStoreService {

  private avatars: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  avatars$: Observable<AssetInfo[]> = this.avatars.asObservable();

  private items: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  items$: Observable<AssetInfo[]> = this.items.asObservable();

  constructor(
    private assetsService: AssetsService,
  ) {}


  fetchMyAssets(wallet: string, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST, page: number = 1) {
    combineLatest([
      this.assetsService.fetchAssets('item', page, list, wallet).pipe(
        map((assets: ApiResponse<AssetInfo[]>) => {
          assets.data.map((asset: AssetInfo) => {
            asset.assetType = ASSET_TYPE.ITEM;
            return asset;
          });
          return assets;
        }
        )),
      this.assetsService.fetchAssets('avatar', page, list, wallet).pipe(
        map((assets: ApiResponse<AssetInfo[]>) => {
          assets.data.map((asset: AssetInfo) => {
            asset.assetType = ASSET_TYPE.AVATAR;
            return asset;
          });
          return assets;
        }
        ))
    ]).pipe(
      take(1),
      map(([items, avatars]) => { return { items, avatars } })
    ).subscribe((data) => {
      this.items.next(data.items.data);
      this.avatars.next(data.avatars.data);
    });
  }

}
