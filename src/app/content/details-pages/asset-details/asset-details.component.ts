import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { Animations } from '@app/core/animations/animations';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import {
  Achievement,
  LegacyEvent,
  LegacyResponse,
} from '@app/core/models/interfaces/legacy.model';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { LegacyService } from '@app/core/services/crypto/legacy.service';
import { DNAParserService } from '@app/core/services/utils/dna-parser.service';
import { StoreService } from '@app/core/store/store.service';
import { environment } from '@env/environment';
import { pipe, Subject, take, takeUntil } from 'rxjs';
const { DNAParser, ContractHandler } = require('totem-dna-parser');

@Component({
  selector: 'asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss'],
  host: {
    class: 'relative m-auto',
  },
  animations: [Animations.animations],
})
export class AssetDetailsComponent implements OnInit {
  assetRendererUrl = environment.ASSET_RENDERER_URL;

  asset!: AssetInfo;
  properties!: any[];
  loading: boolean = false;

  notFound: boolean = false;
  subs = new Subject<void>();
  showSpinner: boolean = false;
  _selectedGame?: GameDetail | null;

  @Input() type!: ASSET_TYPE;
  @Input() set item(asset: any) {
    //console.log(asset);

    this.asset = asset;
    if (asset === null) this.notFound = true;
    if (asset === undefined) return;
    // this.getAssetLegacy();
  }

  @Input() set selectedGame(game: GameDetail | null | undefined) {
    // this._selectedGame = game;
    if (!game) return;
    if (game?.connections?.assetRenderer) {
      this.assetRendererUrl = game?.connections.assetRenderer;
    } else {
      this.assetRendererUrl = environment.ASSET_RENDERER_URL;
    }
  }
  constructor(
    private dnaService: DNAParserService,
    private gamesService: GamesService,
    private assetsService: AssetsService,
    private storeService: StoreService,
    private legacyService: LegacyService,
    private snackbarService: SnackNotifierService
  ) {}

  ngOnInit(): void {
    //this.createLegacy()
    //console.log('ASSET DETAILS');

    this.selectedGame$();
  }

  selectedGame$() {
    this.storeService.selectedGame$
      .pipe(takeUntil(this.subs))
      .subscribe((selectedGame) => {
        if (!selectedGame) return;
        if (this._selectedGame == selectedGame) return;
        this._selectedGame = selectedGame;
        this.processItem(this.asset?.tokenId, selectedGame);
      });
  }

  async processItem(id: number, game: GameDetail | null = null) {
    this.properties = [];

    const json = await this.dnaService.getJSONByGame(game, this.type);
    const properties = await this.dnaService.processJSON(json, this.type, id);
    this.setItemRenderer();
    this.properties = properties;
  }

  setItemRenderer() {
    if (!this.asset) return;
    this.asset = this.storeService.setRenderer(this.type, this.asset);
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  refreshAsset() {
    if (!this.asset) return;
    this.assetsService.fetchAsset(this.asset.tokenId, this.type).subscribe((item: AssetInfo) => {
      this.asset = item;
    })
  }

  // change assetUrl to Default if url for game getted error
  updateUrl() {
    this.asset.rendererUrl = `${environment.ASSET_RENDERER_URL}/${this.type}/${this.asset?.tokenId}?width=400&height=400`;
  }
}
