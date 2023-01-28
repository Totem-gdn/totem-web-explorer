import { Injectable } from "@angular/core";
import { environment } from "@env/environment.local";
import { BehaviorSubject, combineLatest, map, Observable, take } from "rxjs";
import { ASSET_TYPE } from "../models/enums/asset-types.enum";
import { ApiResponse } from "../models/interfaces/api-response.interface";
import { AssetInfo, AssetTypes } from "../models/interfaces/asset-info.model";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";
import { AssetsService } from "../services/assets/assets.service";
import { GamesService } from "../services/assets/games.service";


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

  constructor(
    private assetsService: AssetsService,
    private gamesService: GamesService,
  ) {}

  selectAsset(asset: AssetInfo) {
    this.selectedAsset.next(asset);
  }

  selectGame(game: GameDetail) {
    this._selectedGame.next(game);
  }

  setRenderer(type: ASSET_TYPE, oldAssets: AssetInfo[]) {
    const assets = [...oldAssets];
    const rendererUrl = this.selectedGame?.connections?.assetRenderer;
    let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;

    for(let asset of assets) 
      asset.rendererUrl = `${url}/${type}/${asset.tokenId}?width=400&height=400`;
    console.log('set assets', assets)
    return assets;
  }

  getAssetsAndGames(page: number = 1) {
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
    });
  }

}
