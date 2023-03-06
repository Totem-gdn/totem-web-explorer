import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { UserEntity } from "@app/core/models/interfaces/user-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { UserStateService } from "@app/core/services/auth.service";
import { LegacyService } from "@app/core/services/crypto/legacy.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Component({
    selector: 'asset-information',
    templateUrl: './asset-information.component.html',
    styleUrls: ['./asset-information.component.scss'],
    animations: [
        Animations.animations
    ]
})

export class AssetInformationComponent implements OnInit {

  assetRendererUrl = environment.ASSET_RENDERER_URL;
  numberOfDisplayedCards: number = 3;
  user: Observable<UserEntity | null> = this.authService.currentUser;
  gamesToShowInCards: GameDetail[] = [];
  games: GameDetail[] = [];
  selectedGame: GameDetail | null = null;
  @Input() asset: AssetInfo | null = null;
  @Input() type: string = '';
  @Output() refreshEvent: EventEmitter<string> = new EventEmitter();

  constructor(
    private authService: UserStateService,
    private router: Router,
    private storeService: StoreService,
    private snackbarService: SnackNotifierService,
    private totemEventListenerService: TotemEventListenerService,
  ) { }

  ngOnInit(): void {
    this.listenGames();
    this.listenScreenChanges();
  }

  listenScreenChanges() {
    this.totemEventListenerService.currentBreakpoint$.subscribe((breakpoint: string) => {
      let currentPixelRatio = window.devicePixelRatio;
      if (breakpoint === 'XSmall') {
        this.numberOfDisplayedCards = 0;
        return;
      }
      if (breakpoint === 'XMSmall') {
        if (currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 2;
        } else {
          this.numberOfDisplayedCards = 1;
        }
        return;
      }
      if (breakpoint === 'MSmall') {
        if (currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 2;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      if (breakpoint === 'Small') {
        if (currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 3;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      if (breakpoint === 'Medium') {
        if (currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 3;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      if (breakpoint === 'Large') {
        if (currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 3;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      if (breakpoint === 'Large') {
        if (currentPixelRatio > 1.25) {
          this.numberOfDisplayedCards = 3;
        } else {
          this.numberOfDisplayedCards = 2;
        }
        return;
      }
      this.numberOfDisplayedCards = 3;
    })
  }

  listenSelectedGame() {
    this.storeService.selectedGame$
      .subscribe((game: GameDetail | null) => {
        if (!game) return;
        if (this.selectedGame == game) return;
        this.selectedGame = game;
        this.selectedGameCheck(this.selectedGame);
      })
  }

  listenGames() {
    this.storeService.games$.subscribe((games: GameDetail[]) => {
      if (!games.length) return;
      this.games = games;
      this.listenSelectedGame();
    });
  }

  selectedGameCheck(selectedGame: GameDetail) {
    this.gamesToShowInCards = this.games.filter(game => game?.general?.name != selectedGame?.general?.name);
    //console.log(this.gamesToShowInCards);

  }

  updateSrc(gameToUpdate: GameDetail) {
    let index: number = this.gamesToShowInCards.findIndex((game: GameDetail) => game.id == gameToUpdate.id);
    if (this.gamesToShowInCards[index]) {
      this.gamesToShowInCards[index].connections!.assetRenderer = this.assetRendererUrl;
      return;
    }
    if (this.selectedGame) {
        this.selectedGame.connections!.assetRenderer = this.assetRendererUrl;
    }

  }

  refreshAsset() {
    this.refreshEvent.emit('refresh');
  }

  walletCopied() {
    this.snackbarService.open('Copied to the clipboard');
  }

  navigateToBuy() {
    this.router.navigate(['/buy']);
  }

}
