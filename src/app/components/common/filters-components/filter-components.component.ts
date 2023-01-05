import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { DNAParserService } from '@app/core/services/utils/dna-parser.service';
import { Subject, take, takeUntil } from 'rxjs';
import { FiltersService } from './filters.service';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
    styleUrls: ['./filter-components.component.scss']
})

export class FilterComponentsComponent implements OnDestroy, OnInit {

    constructor(
        private gamesService: GamesService,
        private filtersService: FiltersService,
        private assetsService: AssetsService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    @Output() loadMore = new EventEmitter<number>();
    @Output() sort = new EventEmitter<string>();
    @Output() updateEvent = new EventEmitter<void>();
    @Output() filterItems = new EventEmitter<string>();

    @Input() itemType!: ASSET_TYPE | 'game';
    @Input() showUpdate = true;
    @Input() showSort = true;
    @Input() total?: number;

    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() set setItems(items: any[] | undefined | null) {
        if(items == null) return;
        this.items = items;
        this.page = 1;
        console.log('page', this.page)
        this.showButton = false;

        if (items.length < 10) {
            this.showButton = false;
        } else {
            this.showButton = true;
        }
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
    }

    items: any[] | undefined | null = undefined;
    selectedGame!: GameDetail;
    showButton = true;
    subs = new Subject<void>();
    page = 1;

    ngOnInit(): void {
        this.routeParams$();
    }

    routeParams$() {
        this.route.queryParams
            .pipe(takeUntil(this.subs))
            .subscribe(params => {
                const filter = params['query'];
                // export set games
                if (filter == undefined) return;
                this.filterItems.emit(filter);
            })
    }

    onSort(sortMethod: any) {
        this.sort.emit(sortMethod);
        this.items = undefined;
    }

    selectGame(game: GameDetail) {
        this.gamesService.selectedGame = game;
    }

    onLoadMore() {
        this.page++;
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

    getSelectedGame() {
        return this.gamesService.selectedGame$;
    }

    ngOnDestroy(): void {
        this.page = 1;
        this.subs.next();
        this.subs.complete();
        this.items = null;
        // this.tagsService.clear();
        this.filtersService.reset();
    }

}
