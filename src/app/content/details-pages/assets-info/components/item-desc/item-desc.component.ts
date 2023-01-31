import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { StoreService } from '@app/core/store/store.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { environment } from '@env/environment';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'item-desc',
  templateUrl: './item-desc.component.html',
  styleUrls: ['./item-desc.component.scss'],
  host: {
    class: 'flex grow'
  },
  animations: [
    Animations.animations
  ]
})
export class ItemDescComponent implements OnInit, OnDestroy {
  get defaultRenderer() { return environment.ASSET_RENDERER_URL;}

  constructor(
    private assetsService: AssetsService,
    private web3Service: Web3AuthService,
    private favouritesService: FavouritesService,
    private messageService: SnackNotifierService,
    public router: Router,
    private gamesService: GamesService,
    private storeService: StoreService
  ) {
  }

  @ViewChild('playContainer') playContainer!: ElementRef;

  myWallet!: string;

  @Input() item!: AssetInfo | undefined;
  @Input() type!: ASSET_TYPE;

  games: GameDetail[] = [];
  gamesOnScreen: GameDetail[] = [];
  subs = new Subject<void>();

  ngOnInit() {
    this.gamesService.fetchGames(1)
      .pipe(take(1))
      .subscribe(games => {
        this.games = games.data;

        // const tempArr = [...this.games];

        // for(let i = 0; i < 3; i++) {
        //   const index = Math.floor(Math.random() * tempArr.length);
          
        //   this.gamesOnScreen.push(tempArr[index]);
        // }
        // // this.gamesOnScreen = games.data;
        // console.log('games on screen', this.gamesOnScreen)
        this.selectedGameCheck();
      })
    this.selectedGame$();

  }

  selectedGame$() {
    this.storeService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe(selectedGame => {
        this.selectedGameCheck();
      })
  }
  selectedGameCheck() {
    const selectedGame = this.storeService.selectedGame;
    this.gamesOnScreen = this.games.filter(game => game?.general?.name != selectedGame?.general?.name)
  }

  onClickLike() {
    if (!this.web3Service.isLoggedIn()) {
      this.web3Service.login();
      return;
    }
    if (!this.item) return;
    if (!this.item.isLiked) {
      this.favouritesService.addLike(this.type, this.item.id).pipe(
        takeUntil(this.subs)
      ).subscribe(() => {
        this.updateAsset();
      });
    } else {
      this.favouritesService.removeLike(this.type, this.item.id).pipe(
        takeUntil(this.subs)
      ).subscribe(() => {
        this.updateAsset();
      });
    }

  }

  walletCopied() {
    this.messageService.open('Copied to the clipboard');
  }

  updateAsset() {
    if (!this.item?.id) return;
    this.assetsService.fetchAsset(this.item.id, this.type)
      .subscribe(asset => {
        this.item = asset;
      });
  }

  redirectToBuy() {
    this.router.navigate(['/buy'])
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
