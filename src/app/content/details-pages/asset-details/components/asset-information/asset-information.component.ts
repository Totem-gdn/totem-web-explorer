import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { LegacyService } from "@app/core/services/crypto/legacy.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { TotemEventListenerService } from "@app/core/services/utils/global-event-listeners.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";

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

  constructor(
    private changeDetector: ChangeDetectorRef,
    private dnaService: DNAParserService,
    private gamesService: GamesService,
    private assetsService: AssetsService,
    private storeService: StoreService,
    private legacyService: LegacyService,
    private snackbarService: SnackNotifierService,
    private totemEventListenerService: TotemEventListenerService,
  ) { }

  ngOnInit(): void {
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

}
