import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { SnackNotifierService } from "@app/components/utils/snack-bar-notifier/snack-bar-notifier.service";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { Achievement, LegacyEvent, LegacyResponse } from "@app/core/models/interfaces/legacy.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { LegacyService } from "@app/core/services/crypto/legacy.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { StoreService } from "@app/core/store/store.service";
import { environment } from "@env/environment";
import { pipe, Subject, take, takeUntil } from "rxjs";
const { DNAParser, ContractHandler } = require('totem-dna-parser');


@Component({
    selector: 'asset-info',
    templateUrl: './asset-info.component.html',
    styleUrls: ['./asset-info.component.scss'],
    host: {
        class: 'relative m-auto'
    },
    animations: [
        Animations.animations
    ]
})

export class AssetInfoComponent implements AfterViewInit {

    constructor(
        private changeDetector: ChangeDetectorRef,
        private dnaService: DNAParserService,
        private gamesService: GamesService,
        private assetsService: AssetsService,
        private storeService: StoreService,
        private legacyService: LegacyService,
        private snackbarService: SnackNotifierService,
    ) { }

    assetRendererUrl = environment.ASSET_RENDERER_URL;

    _item!: any;
    properties!: any[];
    loading: boolean = false;

    notFound: boolean = false;
    subs = new Subject<void>();
    activeTab = 'properties';
    showSpinner: boolean = false;
    _selectedGame?: GameDetail | null;

    @Input() type!: ASSET_TYPE;
    @Input() set item(asset: any) {
        this._item = asset;
        if (asset === null) this.notFound = true;
        if (asset === undefined) return;
        this.getAssetLegacy();

        // this.processItem(asset?.tokenId)
        // this.setItemRenderer();
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

    onChangeTab(tab: string) {
        this.activeTab = tab;
    }

    ngAfterViewInit(): void {
      //this.createLegacy()
        this.selectedGame$();
        console.log('OLD ASSET INFO');

    }

    selectedGame$() {
        this.storeService.selectedGame$
            .pipe(takeUntil(this.subs))
            .subscribe(selectedGame => {
                // if(!selectedGame) return;
                this._selectedGame = selectedGame;
                // this.changeDetector.markForCheck();
                this.processItem(this._item?.tokenId, selectedGame);
            })
    }

    async processItem(id: number, game: GameDetail | null = null) {
        this.properties = [];

        const json = await this.dnaService.getJSONByGame(game, this.type)
        const properties = await this.dnaService.processJSON(json, this.type, id);
        this.setItemRenderer();
        this.properties = properties;
    }

    setItemRenderer() {
        const rendererUrl = this.selectedGame?.connections?.assetRenderer;
        let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;
        if(!this._item) return;
        this._item = this.storeService.setRenderer(this.type, this._item);
    }

    createLegacy() {
      const data: LegacyEvent = {
        assetId: this._item.tokenId.toString(),
        gameAddress: '0x64F90CC5554b7C5C43ad6F4a8488c2b6715f4381',
        playerAddress: '0xb0B186E176c6ba778FFcB014db00b2e85d3F33Ae',
        data: 'NCBtb25zdGVycyBraWxsZWQgYXQgb25lIHRpbWU='
      }
    }

    getAssetLegacy(query?: string, asset?: AssetInfo) {
      let params: string = '&offset=0&limit=10';
      this.legacyService.fetchLegacies(this.type, this._item?.tokenId!, params).subscribe((data: LegacyResponse<Achievement[]>) => {

      })
    }

    paginationEvent(event: any) {
      let queryParam: string = '';
      queryParam += '&offset=' + (event.currentPage * event.size).toString();
      queryParam += '&limit=' + event.size;
      this.getAssetLegacy(queryParam);
    }

    setContentHeight() {

    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }

    // change assetUrl to Default if url for game getted error
    updateUrl() {
            this._item.rendererUrl = `${environment.ASSET_RENDERER_URL}/${this.type}/${this._item?.tokenId}?width=400&height=400`
        // setInterval(() => {
        //     this._item.rendererUrl = `${environment.ASSET_RENDERER_URL}/${this.type}/${this._item?.tokenId}?width=400&height=400`
        // }, 100)
    }
}
