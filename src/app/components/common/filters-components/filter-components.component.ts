import { Component, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { CacheService } from '@app/core/services/assets/cache.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { Subject, takeUntil } from 'rxjs';

import { TagsService } from './services/tags.service';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
    host: {
        // class: 'min-h-[100vh]'
    }
})

export class FilterComponentsComponent implements OnDestroy {

    constructor(private tagsService: TagsService, private gamesService: GamesService, private cacheService: CacheService) {}

    @Output() loadMore = new EventEmitter<number>();
    @Output() sort = new EventEmitter<string>();
    @Input() itemType = 'item';
    @Input() showUpdate = true;
    @Input() showSort = true;

    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() set setItems(items: any[] | undefined | null) {
        // if(items == null) return;
        this.items = items;
        this.page = 1;
        this.showButton = false;
    }

    @Input() set pushItems(items: any[] | undefined | null) {
        if(items == null) return;
        if(!this.items?.length) this.items = [];
        this.items = this.items.concat(items);
        this.cacheService.totalByAssetType(this.itemType, this.items);

        if(items.length < 10) this.showButton = false;
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
        if(!this.wrapper) return;
        const width = this.wrapper.nativeElement.offsetWidth;
        if(width > 880) {
            this.wrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr 1fr';
        }
        if(width <= 880) {
            this.wrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr';
        }
        if(width <= 560) {
            this.wrapper.nativeElement.style.gridTemplateColumns = '1fr';
        }
    }
    ngOnDestroy(): void {
        this.subs.next();
        this.subs.complete();
        this.tagsService.clear();
    }
}
