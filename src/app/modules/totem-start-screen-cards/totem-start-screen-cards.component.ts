import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GamesService } from '@app/core/services/assets/games.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { BehaviorSubject } from 'rxjs';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetsStoreService } from '@app/core/store/assets-store.service';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { StoreService } from '@app/core/store/store.service';
import { environment } from '@env/environment';

@Component({
  selector: 'totem-start-screen-cards',
  templateUrl: './totem-start-screen-cards.component.html',
  styleUrls: ['./totem-start-screen-cards.component.scss'],
})
export class TotemStartScreenCardsComponent {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  selectedAsset$: BehaviorSubject<AssetInfo | null> = new BehaviorSubject<AssetInfo | null>(null);
  selectedAssets$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  selectedGames$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  avatars$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  items$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);

  assetTypeSelected: 'item' | 'avatar' = 'avatar';

  constructor(private router: Router,
              private storeService: StoreService,
              private web3Service: Web3AuthService,
              private messageService: SnackNotifierService,
              private gameService: GamesService) {}

  ngOnInit(): void {
    this.listenSelectedGameAndAsset();

    this.storeService.games$.subscribe((games: GameDetail[]) => {
      console.log('GAMES FROM STORAGE: ', games);
      this.games$.next(games);
    });

    this.storeService.avatars$.subscribe((avatars: AssetInfo[]) => {
      console.log('avatars FROM STORAGE: ', avatars);
      this.avatars$.next(avatars);
      if (this.assetTypeSelected === ASSET_TYPE.AVATAR) {
        this.setAsset(avatars[0]);
      }
    });

    this.storeService.items$.subscribe((items: AssetInfo[]) => {
      console.log('items FROM STORAGE: ', items);
      this.items$.next(items);
      if (this.assetTypeSelected === ASSET_TYPE.ITEM) {
        this.setAsset(items[0]);
      }
    });
  }

  listenSelectedGameAndAsset() {
    this.storeService.selectedGame$.subscribe((game: GameDetail | null) => {
      this.selectedGame$.next(game);
      this.setAsset(this.selectedAsset$.getValue());
    });
    this.storeService.selectedAsset$.subscribe((asset: AssetInfo | null) => {
      this.selectedAsset$.next(asset);
      this.setRendererImageUrlForAll();
    });
  }

  setAsset(asset: AssetInfo | null) {
    if (!asset) return;
    const selectedGame: GameDetail | null = this.selectedGame$.getValue();
    const rendererUrlChecked = this.componeRendererUrl(selectedGame);
    asset.rendererUrl = `${rendererUrlChecked}/${this.assetTypeSelected}/${asset?.tokenId}?width=400&height=400`;
    asset.rarity = asset.tokenId % 100;
    this.storeService.selectAsset(asset);
  }

  /* setGame(game: GameDetail | null) {
    if (!game) return;
    this.selectedGame$.next(game);
  } */

  // utils

  setAnotherAsset() {
    this.setAsset(this.avatars$.getValue()[2])
  }

  componeRendererUrl(game: GameDetail | null): string {
    let rendererFromGame: string = game && game.connections?.assetRenderer ? game.connections.assetRenderer : environment.ASSET_RENDERER_URL;
    const rendererUrlChecked = rendererFromGame.slice(-1) === '/' ? rendererFromGame.slice(0, -1) : rendererFromGame;
    return rendererUrlChecked;
  }

  setRendererImageUrlForAll() {
    const selectedAsset = this.selectedAsset$.getValue();
    const selectedGame = this.selectedGame$.getValue();
    const gamesToSelect = this.games$.getValue().filter((game: GameDetail) => {
      if (selectedGame?.id) {
        return game.id !== selectedGame!.id
      } else {
        return true;
      }
    });
    this.selectedGames$.next(gamesToSelect);
    const assetsToSelect: AssetInfo[] = gamesToSelect.map((game: GameDetail) => {
        const rendererUrlChecked = this.componeRendererUrl(game);
        return {
          ...selectedAsset!,
          rendererUrl: `${rendererUrlChecked}/${this.assetTypeSelected}/${selectedAsset?.tokenId}?width=400&height=400`,
          rarity: selectedAsset?.tokenId! % 100
        }
    });
    this.selectedAssets$.next(assetsToSelect);
  }

  /* selectAsset(assetType: 'item' | 'avatar') {
    this.assetTypeSelected = assetType;
    this.setRendererImageUrl();
  } */

}
