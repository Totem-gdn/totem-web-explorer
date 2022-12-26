import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { environment } from "@env/environment";
import { pipe, Subject, take, takeUntil } from "rxjs";
const { DNAParser, ContractHandler } = require('totem-dna-parser');


@Component({
    selector: 'asset-info',
    templateUrl: './asset-info.component.html',
    styleUrls: ['./asset-info.component.scss'],
    host: {
        class: 'relative'
    }
})

export class AssetInfoComponent implements AfterViewInit {

    constructor(
        private changeDetector: ChangeDetectorRef,
        private dnaService: DNAParserService,
        private gamesService: GamesService,
        private assetsService: AssetsService
    ) { }

    assetRendererUrl = environment.ASSET_RENDERER_URL;

    _item!: any;
    assets!: any[];
    properties!: any[];

    notFound: boolean = false;
    subs = new Subject<void>();
    activeTab = 'properties';
    showSpinner: boolean = false;

    @Input() type!: ASSET_TYPE;
    @Input() set item(asset: any) {
        this._item = asset;
        if (asset === null) this.notFound = true;
        if (asset === undefined) return;

        this.processItem(asset?.tokenId)
    }

    @Input() set selectedGame(game: GameDetail | null) {
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
        this.sliderItems();
        this.selectedGame$();

        const sessionGame = this.gamesService.gameInSession;
        if (!sessionGame?.general?.name) return;
        this.changeDetector.detectChanges();
    }

    selectedGame$() {
        this.gamesService.selectedGame$
            .pipe(takeUntil(this.subs))
            .subscribe(selectedGame => {
                this.processItem(this._item?.tokenId, selectedGame);
            })
    }

    sliderItems() {
        this.assetsService.fetchAssets(this.type, 1)
        .pipe(take(1))
        .subscribe(assets => {
            this.assets = assets.data;
        });
    }

    async processItem(id: number, game: GameDetail | null = null) {
        this.properties = [];
        const json = await this.dnaService.getJSONByGame(game, this.type)
        const properties = await this.dnaService.processJSON(json, this.type, id);
        this.properties = properties;
    }

    handleProperties(title: string, value: string) {

    }

    ngOnDestroy() {
        this.subs.next();
        this.subs.complete();
    }

    // change assetUrl to Default if url for game getted error
    updateUrl() {
        this.assetRendererUrl = environment.ASSET_RENDERER_URL;
    }
}
