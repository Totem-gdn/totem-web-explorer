import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { ASSET_TYPE } from "../models/enums/asset-types.enum";
import { ApiResponse } from "../models/interfaces/api-response.interface";
import { AssetInfo, AssetTypes } from "../models/interfaces/asset-info.model";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";
import { AssetsService } from "../services/assets/assets.service";
import { GamesService } from "../services/assets/games.service";





////// TO DELETE





@Injectable({ providedIn: 'root' })

export class AssetsStoreService {

  private selectedAsset: BehaviorSubject<AssetInfo | null> = new BehaviorSubject<AssetInfo | null>(null);
  selectedAsset$: Observable<AssetInfo | null> = this.selectedAsset.asObservable();

  private avatars: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  avatars$: Observable<AssetInfo[]> = this.avatars.asObservable();

  private items: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  items$: Observable<AssetInfo[]> = this.items.asObservable();

  constructor(private assetsService: AssetsService) {}

  selectAsset(asset: AssetInfo) {
    this.selectedAsset.next(asset);
  }

  getAssets(type: AssetTypes, page: number = 1) {
    this.assetsService.fetchAssets(type, page).subscribe((assets: ApiResponse<AssetInfo[]>) => {
      if (type === ASSET_TYPE.AVATAR) {
        this.avatars.next(assets.data);
      }
      if (type === ASSET_TYPE.ITEM) {
        this.items.next(assets.data);
      }
    })
  }

}
