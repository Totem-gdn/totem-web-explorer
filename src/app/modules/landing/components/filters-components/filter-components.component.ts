import { Component, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { FiltersService } from '@app/modules/landing/components/filters-components/services/filters.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
})

export class FilterComponentsComponent implements AfterViewInit {

    constructor(private filterService: FiltersService,
                private itemsService: TotemItemsService) {

    }

    @Input() itemType = 'item';
    @Input() mode = 'active';
    @Input() showUpdate = true;
    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() set items(items: any[] | undefined | null) {
        if(items == null) return;
        this._items = items;
        this.onLoadMore();
    }
    private _items: any[] | undefined;

    itemsToShow: any[] | undefined;
    currentItemIndex = 0;
    showButton = true;

    sub!: Subscription;

    ngAfterViewInit() {
        this.sortSub();
        this.onLoadMore();

    }

    onLoadMore() {
        if(!this._items) return;
        if(!this.itemsToShow?.length) {
            this._items.length - 1 < 5 ? this.currentItemIndex = this._items.length - 1 : this.currentItemIndex = 5;
            this.itemsToShow = this._items.slice(0, this.currentItemIndex + 1);
            return;
        }
        if(this.currentItemIndex == this._items.length - 1) {
            this.showButton = false;
            return;
        }
        let nextItemIndex = this.currentItemIndex + this.numberOfItemsToFit();

        if(this._items.length - 1 <= nextItemIndex) {
            nextItemIndex = this._items.length - 1;
            this.showButton = false;
        } else {
            this.showButton = true;
        }
        
        const itemsToPush = this._items.slice(this.currentItemIndex + 1, nextItemIndex + 1);
        this.currentItemIndex = nextItemIndex;
        this.itemsToShow.push(...itemsToPush);
        
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

    numberOfItemsToFit() {
        const containerWidth = this.wrapper.nativeElement.offsetWidth;
        const containerHeight = this.wrapper.nativeElement.offsetHeight;
        const numberOfItems = (Math.floor(containerWidth / 330) * Math.floor(containerHeight / 440))
        return numberOfItems;
    }

    sortSub() {
        this.sub = this.filterService.sort$().subscribe(sortType => {
            if(sortType == 'newest') {
                // this.items?.sort(function (a, b) {
                //     console.log(a.tokenId = b.tokenId)
                //     // return a.tokenId - b.tokenId;
                // });
            }
            if(sortType == 'most-popular') {
                this.items?.sort(function (a, b) {
                    return a.createdAt - b.createdAt;
                });
                this.items = this.items?.reverse();
            }
        })
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
        this.filterService.resetFilters();
        this.itemsService.resetFilters();
    }
}
