import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { GamesService } from "@app/core/services/assets/games.service";
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
        private storeService: StoreService
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
        console.log('asset', asset)
        this._item = asset;
        if (asset === null) this.notFound = true;
        if (asset === undefined) return;

        this.processItem(asset?.tokenId)
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
        this.selectedGame$();

        const sessionGame = this.gamesService.gameInSession;
        if (!sessionGame?.general?.name) return;
        this.changeDetector.detectChanges();
    }

    selectedGame$() {
        this.storeService.selectedGame$
            .pipe(takeUntil(this.subs))
            .subscribe(selectedGame => {
                if(!selectedGame) return;
                this._selectedGame = selectedGame;
                this.changeDetector.markForCheck();
                console.log('selected game asset' , this._selectedGame)
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
        // console.log('selected game')
        const rendererUrl = this.selectedGame?.connections?.assetRenderer;
        let url = rendererUrl ? rendererUrl : environment.ASSET_RENDERER_URL;
        // console.log('this item', this._item)
        if(!this._item) return;
        this._item = this.storeService.setRenderer(this.type, this._item);
        // console.log('this item after', this._item)
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
    }
}
