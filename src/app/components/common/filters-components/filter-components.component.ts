import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { CacheService } from '@app/core/services/assets/cache.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { DNAParserService } from '@app/core/services/utils/dna-parser.service';
import { Subject } from 'rxjs';
import { FiltersService } from './filters.service';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
    styleUrls: ['./filter-components.component.scss']
})

export class FilterComponentsComponent implements OnDestroy, OnInit {
    ngOnInit(): void {
    }

    constructor(
        private gamesService: GamesService,
        private filtersService: FiltersService
    ) { }

    @Output() loadMore = new EventEmitter<number>();
    @Output() sort = new EventEmitter<string>();
    @Output() updateEvent = new EventEmitter<void>();

    @Input() itemType!: ASSET_TYPE | 'game';
    @Input() showUpdate = true;
    @Input() showSort = true;
    @Input() extendedSort = false;
    @Input() total?: number;

    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() set setItems(items: any[] | undefined | null) {
        // if(items == null) return;
        this.items = items;
        this.page = 1;
        this.showButton = false;
    }

    @Input() set pushItems(items: any[] | undefined | null) {
        if (items == null) return;
        if (!this.items?.length) this.items = [];
        this.items = this.items.concat(items);
        if (items.length < 10) {
            this.showButton = false;
        } else {
            this.showButton = true;
        }
        this.page++;
    }

    items: any[] | undefined | null = undefined;
    selectedGame!: GameDetail;
    showButton = true;
    subs = new Subject<void>();
    page = 1;

    onSort(sortMethod: any) {
        this.sort.emit(sortMethod);
        this.items = undefined;
    }

    selectGame(game: GameDetail) {
        this.gamesService.selectedGame = game;
    }

    onLoadMore() {
        this.loadMore.emit(this.page);
    }

    ngAfterViewChecked(): void {
        if (!this.wrapper) return;
        const width = this.wrapper.nativeElement.offsetWidth;
        if (width > 880) {
            this.wrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr 1fr';
        }
        if (width <= 880) {
            this.wrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr';
        }
        if (width <= 560) {
            this.wrapper.nativeElement.style.gridTemplateColumns = '1fr';
        }
    }
    ngOnDestroy(): void {
        this.page = 1;
        this.subs.next();
        this.subs.complete();
        this.items = null;
        // this.tagsService.clear();
        this.filtersService.reset();
    }

    getSelectedGame() {
        return this.gamesService.selectedGame$;
    }
}
