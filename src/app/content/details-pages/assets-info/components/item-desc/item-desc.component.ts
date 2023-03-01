import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { UserEntity } from '@app/core/models/interfaces/user-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { UserStateService } from '@app/core/services/auth.service';
import { StoreService } from '@app/core/store/store.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { FavouritesService } from '@app/modules/profile/dashboard/favourites/favourites.service';
import { environment } from '@env/environment';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { Subject, Subscription, take, takeUntil } from 'rxjs';

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
    private storeService: StoreService,
    private authService: UserStateService
  ) {
  }

  @ViewChild('playContainer') playContainer!: ElementRef;

  myWallet!: string;

  @Input() item!: AssetInfo | undefined;
  @Input() type!: ASSET_TYPE;

  games: GameDetail[] = [];
  gamesOnScreen: GameDetail[] = [];
  subs = new Subject<void>();
  userSub?: Subscription;
  user?: UserEntity;

  ngOnInit() {
    this.gamesService.fetchGames(1)
      .pipe(take(1))
      .subscribe(games => {
        this.games = games.data;
        this.selectedGameCheck();
      })

    this.selectedGame$();
    this.user$();
  }

  goToProfile() {
    this.router.navigate([`/profile/${this.item?.owner}`]);
  }

  setNewSelectedGame(game: GameDetail) {
    this.storeService.selectGame(game);
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

  user$() {
    // this.userSub?.unsubscribe();
    this.userSub = this.authService.currentUser
      .subscribe(user => {
        if(user) {
          this.user = user;
        }
      })
  }

  redirectToBuy() {
    this.router.navigate(['/buy'])
  }

  ngOnDestroy(): void {
    this.userSub?.unsubscribe();
    this.subs.next();
    this.subs.complete();
  }

}
