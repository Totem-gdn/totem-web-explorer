import { Component, Input, OnDestroy, OnInit } from "@angular/core";
import { Animations } from "@app/core/animations/animations";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { GamesService } from "@app/core/services/assets/games.service";
import { DNAParserService } from "@app/core/services/utils/dna-parser.service";
import { Subject, takeUntil } from "rxjs";

@Component({
    selector: 'assets-menus',
    templateUrl: './assets-menus.component.html',
    // styleUrls: ['../styles/filter-menus.component.scss']
    animations: [
        Animations.animations
    ]
})

export class AssetsMenusComponent implements OnInit, OnDestroy {
    get inputType() { return INPUT_TYPE };

    constructor(private gamesService: GamesService,
                private dnaService: DNAParserService) {}
    
    @Input() menuType!: ASSET_TYPE;
    items: DNAField[] | undefined;

    subs = new Subject<void>();

    ngOnInit() {
        this.selectedGame$();
    }

    selectedGame$() {
        this.gamesService.selectedGame$
            .pipe(takeUntil(this.subs))
        .subscribe(selectedGame => {
            this.processFiltersContent(selectedGame);
        })
    }

    async processFiltersContent(game: GameDetail | null) {
        const json = await this.dnaService.getJSONByGame(game, this.menuType);
        const properties = await this.dnaService.processJSON(json, this.menuType);
        for(let prop of properties) {
            console.log(prop)
        }
        const filtered = properties.filter(prop => { return prop.id != 'primary_color' });
        this.items = filtered;
    }

    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
    }
}