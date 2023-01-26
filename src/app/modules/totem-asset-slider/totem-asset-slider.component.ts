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
  selector: 'totem-asset-slider',
  templateUrl: './totem-asset-slider.component.html',
  styleUrls: ['./totem-asset-slider.component.scss'],
})
export class TotemAssetSliderComponent {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  items$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  avatars$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);

  @Input() assetTypeSelected: 'item' | 'avatar' = 'item';
  @Input() searchType: 'latest' | 'popular' = 'latest';
  @Input() caption: string = '';
  @Input() withGameSelector: boolean = false;

  constructor(
              private storeService: StoreService,
              ) {}

  ngOnInit(): void {
    this.listenSelectedGameAndAsset();

    this.storeService.games$.subscribe((games: GameDetail[]) => {
      console.log('GAMES FROM STORAGE: ', games);
      this.games$.next(games);
    });

    if (this.assetTypeSelected === 'item') {
      this.listenItems();
    }
    if (this.assetTypeSelected === 'avatar') {
      this.listenAvatars();
    }

  }

  listenAvatars() {
    this.storeService.avatars$.subscribe((avatars: AssetInfo[]) => {
      console.log('avatars FROM STORAGE: ', avatars);
      this.avatars$.next(avatars);
      this.setRendererUrlForAll();
    });
  }

  listenItems() {
    this.storeService.items$.subscribe((items: AssetInfo[]) => {
      console.log('items FROM STORAGE: ', items);
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
    const items = this.items$.getValue();

    const assets: AssetInfo[] = items.map((asset: AssetInfo) => {
        const rendererUrlChecked = this.componeRendererUrl(selectedGame);
        return {
          ...asset,
          rendererUrl: `${rendererUrlChecked}/${this.assetTypeSelected}/${asset?.tokenId}?width=400&height=400`,
          rarity: asset?.tokenId! % 100
        }
    });
    this.items$.next(assets);
  }

}
