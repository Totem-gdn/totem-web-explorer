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
import { AssetsService } from '@app/core/services/assets/assets.service';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';

@Component({
  selector: 'totem-entity-slider',
  templateUrl: './totem-entity-slider.component.html',
  styleUrls: ['./totem-entity-slider.component.scss'],
})
export class TotemEntitySliderComponent {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  items$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  avatars$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);

  @Input() assetTypeSelected: 'item' | 'avatar' | 'game' | 'legacy' = 'item';
  @Input() searchType: 'latest' | 'popular' = 'latest';
  @Input() caption: string = '';
  @Input() withGameSelector: boolean = false;

  @Input() set list(list: ASSET_PARAM_LIST) {
    this.fetchMyAssets(this.ownerAddress, list);
  }
  @Input() ownerAddress?: string;

  constructor(
    private storeService: StoreService,
    private assetsService: AssetsService
  ) { }

  ngOnInit(): void {
    this.listenSelectedGameAndAsset();
    this.listenGames();

    if (this.ownerAddress) return;

    if (this.assetTypeSelected === 'item') {
      this.listenItems();
    }
    if (this.assetTypeSelected === 'avatar') {
      this.listenAvatars();
    }
  }

  listenGames() {
    this.storeService.games$.subscribe((games: GameDetail[]) => {
      this.games$.next(games);
    });
  }

  listenAvatars() {
    this.storeService.avatars$.subscribe((avatars: AssetInfo[]) => {
      this.avatars$.next(avatars);
      this.setRendererUrlForAll();
    });
  }

  listenItems() {
    this.storeService.items$.subscribe((items: AssetInfo[]) => {
      this.items$.next(items);
      this.setRendererUrlForAll();
    });
  }

  listenSelectedGameAndAsset() {
    this.storeService.selectedGame$.subscribe((game: GameDetail | null) => {
      this.selectedGame$.next(game);
      if (!game) return;
      this.setRendererUrlForAll();
    });
  }

  fetchMyAssets(wallet?: string, list: ASSET_PARAM_LIST = ASSET_PARAM_LIST.LATEST) {
    if (this.assetTypeSelected == 'avatar') {
      this.assetsService.fetchAssets('avatar', 1, list, wallet)
        .subscribe(avatars => {
          this.avatars$.next(avatars.data);
          this.setRendererUrlForAll();
        })
    }
    if (this.assetTypeSelected == 'item') {
      this.assetsService.fetchAssets('item', 1, list, wallet)
        .subscribe(items => {
          this.items$.next(items.data);
          this.setRendererUrlForAll();
        })
    }
  }

  // utils

  setGame(game: GameDetail) {
    this.storeService.selectGame(game);
  }

  componeRendererUrl(game: GameDetail | null): string {
    let rendererFromGame: string = game && game.connections?.assetRenderer ? game.connections.assetRenderer : environment.ASSET_RENDERER_URL;
    const rendererUrlChecked = rendererFromGame.slice(-1) === '/' ? rendererFromGame.slice(0, -1) : rendererFromGame;
    return rendererUrlChecked;
  }

  setRendererUrlForAll() {
    const selectedGame = this.selectedGame$.getValue();
    const items = this.assetTypeSelected === 'item' ? this.items$.getValue() : this.avatars$.getValue();

    const assets: AssetInfo[] = items.map((asset: AssetInfo) => {
      const rendererUrlChecked = this.componeRendererUrl(selectedGame);
      return {
        ...asset,
        rendererUrl: `${rendererUrlChecked}/${this.assetTypeSelected}/${asset?.tokenId}?width=400&height=400`,
        rarity: asset?.tokenId! % 100
      }
    });

    if (this.assetTypeSelected === 'item') {
      this.items$.next(assets);
    }
    if (this.assetTypeSelected === 'avatar') {
      this.avatars$.next(assets);
    }

  }

}
