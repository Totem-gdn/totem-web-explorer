import { Injectable } from "@angular/core";
import { environment } from "@env/environment.local";
import { BehaviorSubject, combineLatest, map, Observable, take } from "rxjs";
import { ASSET_TYPE } from "../models/enums/asset-types.enum";
import { ApiResponse } from "../models/interfaces/api-response.interface";
import { AssetInfo, AssetTypes } from "../models/interfaces/asset-info.model";
import { ItemLegacy, LegacyData } from "../models/interfaces/legacy.model";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";
import { AssetsService } from "../services/assets/assets.service";
import { GamesService } from "../services/assets/games.service";
import { LegacyService } from "../services/crypto/legacy.service";

const preselectedAsset: AssetInfo = {
  id: "63d980c42bb655b3e997ad76",
  owner: "0x31aFfe2bD3E2BAB4296869bb0dD6f7fa5c4Ed66F",
  owners: [
      "0x31aFfe2bD3E2BAB4296869bb0dD6f7fa5c4Ed66F"
  ],
  tokenId: 669,
  views: '2',
  createdAt: "2023-01-31T20:57:42.219Z",
  updatedAt: "2023-01-31T22:18:43.603Z",
  isLiked: false,
  likes: 0,
  games: 0,
  lastUsed: "",
  assetType: "avatar"
}

@Injectable({ providedIn: 'root' })

export class StoreService {

  private selectedAsset: BehaviorSubject<AssetInfo | null> = new BehaviorSubject<AssetInfo | null>(null);
  selectedAsset$: Observable<AssetInfo | null> = this.selectedAsset.asObservable();

  private _selectedGame: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  selectedGame$: Observable<GameDetail | null> = this._selectedGame.asObservable();
  get selectedGame() { return this._selectedGame.getValue() }

  private avatars: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  avatars$: Observable<AssetInfo[]> = this.avatars.asObservable();

  private items: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  items$: Observable<AssetInfo[]> = this.items.asObservable();

  private games: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  games$: Observable<GameDetail[]> = this.games.asObservable();

  private legacy: BehaviorSubject<LegacyData[]> = new BehaviorSubject<LegacyData[]>([]);
  legacy$: Observable<LegacyData[]> = this.legacy.asObservable();

  private appLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  appLoading$: Observable<boolean> = this.appLoading.asObservable();

  constructor(
    private assetsService: AssetsService,
    private gamesService: GamesService,
    private legacyService: LegacyService
  ) {}

  selectAsset(asset: AssetInfo) {
    this.selectedAsset.next(asset);
  }

  selectGame(game: GameDetail) {
    this._selectedGame.next(game);
  }

  setRenderers(type: ASSET_TYPE, oldAssets: AssetInfo[]) {
    const assets = [...oldAssets];

    for(let asset of assets) {
      asset = this.setRenderer(type, asset);
    }

    return assets;
  }
  setRenderer(type: ASSET_TYPE, asset: AssetInfo) {

    const rendererUrl = this.selectedGame?.connections?.assetRenderer;

    let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;
    url = url.slice(-1) === '/' ? url.slice(0, -1) : url;
    asset.rendererUrl = `${url}/${type}/${asset?.tokenId}?width=400&height=400`;
    return asset;
  }

  getLegacies() {
    this.legacyService.fetchAssetLegacies(ASSET_TYPE.ITEM)
      .subscribe(legacy => {
        console.log('legacy', legacy)
        if(!legacy.results) return;
        this.legacy.next(legacy.results);
      })

  }


  getAssetsAndGames(page: number = 1) {
    this.appLoading.next(true);
    combineLatest([
      this.gamesService.fetchGames(page),
      this.assetsService.fetchAssets(ASSET_TYPE.ITEM, page).pipe(
        map((assets: ApiResponse<AssetInfo[]>) => {
          assets.data.map((asset: AssetInfo) => {
            asset.assetType = ASSET_TYPE.ITEM;
            return asset;
          });
          return assets;
        }
        )),
      this.assetsService.fetchAssets(ASSET_TYPE.AVATAR, page).pipe(
        map((assets: ApiResponse<AssetInfo[]>) => {
          assets.data.map((asset: AssetInfo) => {
            asset.assetType = ASSET_TYPE.AVATAR;
            return asset;
          });
          return assets;
        }
        )),
    ]).pipe(
      take(1),
      map(([games, items, avatars]) => { return { games, items, avatars } })
    ).subscribe((data) => {
      this.games.next(data.games.data);
      this.items.next(data.items.data);
      this.avatars.next(data.avatars.data);
      this.appLoading.next(false);
    });
  }

}
