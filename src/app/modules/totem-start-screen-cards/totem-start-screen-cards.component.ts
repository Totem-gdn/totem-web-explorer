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
import { TotemEventListenerService } from '@app/core/services/utils/global-event-listeners.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Animations } from '@app/core/animations/animations';

@Component({
  selector: 'totem-start-screen-cards',
  templateUrl: './totem-start-screen-cards.component.html',
  styleUrls: ['./totem-start-screen-cards.component.scss'],
  animations: Animations.animations
})
export class TotemStartScreenCardsComponent extends OnDestroyMixin {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  selectedAsset$: BehaviorSubject<AssetInfo | null> = new BehaviorSubject<AssetInfo | null>(null);
  selectedAssets$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  selectedGames$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);

  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  avatars$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);
  items$: BehaviorSubject<AssetInfo[]> = new BehaviorSubject<AssetInfo[]>([]);

  assetTypeSelected: 'item' | 'avatar' = 'avatar';
  currentBreakpoint: string = '';
  currentPixelRatio: number = 0;
  numberOfDisplayedCards: number = 4;
  selectedGameIndex: number = 0;
  gamesListLength: number = 0;

  constructor(private router: Router,
              private storeService: StoreService,
              private totemEventListenerService: TotemEventListenerService,
              ) {
                super();
              }

  ngOnInit(): void {
    this.listenSelectedGameAndAsset();
    this.initBreakpointListener();
    this.storeService.games$.subscribe((games: GameDetail[]) => {
      this.games$.next(games);
      this.gamesListLength = games.length || 0;
    });

    this.storeService.avatars$.subscribe((avatars: AssetInfo[]) => {
      this.avatars$.next(avatars);
      if (this.assetTypeSelected === ASSET_TYPE.AVATAR) {
        this.setAsset(avatars[0]);
      }
    });

    this.storeService.items$.subscribe((items: AssetInfo[]) => {
      this.items$.next(items);
      if (this.assetTypeSelected === ASSET_TYPE.ITEM) {
        this.setAsset(items[0]);
      }
    });
  }

  initBreakpointListener() {
    this.totemEventListenerService.currentBreakpoint$.pipe(untilComponentDestroyed(this)).subscribe((breakpoint: string) => {
      this.currentBreakpoint = breakpoint;
      this.currentPixelRatio = window.devicePixelRatio;
      if (breakpoint === 'XSmall') {
        this.numberOfDisplayedCards = 0;
        return;
      }
      if (breakpoint === 'XMSmall') {
        if (this.currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 2;
        } else {
          this.numberOfDisplayedCards = 1;
        }
        return;
      }
      if (breakpoint === 'Small' || breakpoint === 'MSmall') {
        if (this.currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 3;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      if (breakpoint === 'Medium') {
        if (this.currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 2;
        } else {
          this.numberOfDisplayedCards = 1;
        }
        return;
      }
      if (breakpoint === 'Large') {
        if (this.currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 3;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      if (breakpoint === 'XLarge') {
        this.numberOfDisplayedCards = 3;
        return;
      }
      if (breakpoint === 'XXLarge') {
        this.numberOfDisplayedCards = 4;
        return;
      }
      this.numberOfDisplayedCards = 4;
    })
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

  selectPrevGame() {
    if (this.selectedGameIndex == 0) return;
    this.selectedGameIndex -= 1;
    const games: GameDetail[] = this.games$.getValue();
    this.storeService.selectGame(games[this.selectedGameIndex]);
  }

  selectNextGame() {
    if (this.selectedGameIndex < this.gamesListLength - 1) {
      this.selectedGameIndex += 1;
      const games: GameDetail[] = this.games$.getValue();
      this.storeService.selectGame(games[this.selectedGameIndex]);
    } else {
      this.selectedGameIndex = 0;
      const games: GameDetail[] = this.games$.getValue();
      this.storeService.selectGame(games[this.selectedGameIndex]);
    }
  }

  goToGame(game: GameDetail) {
    this.router.navigate(['game', game.id]);
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
