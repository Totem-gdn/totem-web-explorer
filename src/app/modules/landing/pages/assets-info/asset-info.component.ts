import { AfterViewInit, ChangeDetectorRef, Component, Input } from "@angular/core";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { environment } from "@env/environment";
import { Subject, takeUntil } from "rxjs";
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
        private itemsService: TotemItemsService,
        private changeDetector: ChangeDetectorRef,
        private dnaService: DNAParserService,
        private gamesService: GamesService
    ) { }

    assetRendererUrl = environment.ASSET_RENDERER_URL;

    _item!: any;
    assets!: any[];
    properties!: any[];

    notFound: boolean = false;
    subs = new Subject<void>();
    activeTab = 'properties';

    @Input() type!: string;
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
                // this.properties = this.dnaService.getProperties(selectedGame?.general?.name, this.type);
                this.processItem(this._item?.tokenId, selectedGame?.general?.name);
            })
    }

    sliderItems() {
        if (this.type == 'avatar') {
            this.itemsService.getAvatars$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
        if (this.type == 'gem') {
            this.itemsService.getGems$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
        if (this.type == 'item') {
            this.itemsService.getItems$().pipe(takeUntil(this.subs))
                .subscribe(assets => {
                    this.assets = assets;
                })
        }
    }

    async processItem(id: number, gameName?: string | undefined) {
        const url = 'https://matic-mumbai.chainstacklabs.com'
        let contract = ''
        const json = this.dnaService.getJSON(gameName, this.type);
        this.properties = json;
        if (this.type === 'item') {
            contract = '0xfC5654489b23379ebE98BaF37ae7017130B45086'
        } else if (this.type === 'gem') {
            contract = '0x0e2a085063e15FEce084801C6806F3aE7eaDfBf5'
        } else if (this.type === 'avatar') {
            contract = '0xEE7ff88E92F2207dBC19d89C1C9eD3F385513b35'
        }
        const contractHandler = new ContractHandler(url, contract)

        const DNA = await contractHandler.getDNA(id)

        const parser = new DNAParser(json, DNA)

        this._item.rarity = parser.getItemRarity(id)

        this.properties.map((prop) => {
            const value = parser.getField(prop.id);
            prop.value = this.dnaService.handleDNAField(prop.id, value);
        })
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
