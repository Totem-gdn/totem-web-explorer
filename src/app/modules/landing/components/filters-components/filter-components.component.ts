import { Component, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { FiltersService } from '@app/modules/landing/components/filters-components/services/filters.service';
import { Subscription } from 'rxjs';
import { TagsService } from './services/tags.service';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
})

export class FilterComponentsComponent implements OnDestroy {

    constructor(private tagsService: TagsService) {}

    @Output() loadMore = new EventEmitter<number>();
    @Input() itemType = 'item';
    @Input() showUpdate = true;

    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() set setItems(items: any[] | undefined | null) {
        if(items == null) return;
        this.items = items;
        this.page = 1;
        this.showButton = false;
    }

    @Input() set pushItems(items: any[] | undefined | null) {
        if(items == null) return;
        if(!this.items?.length) this.items = [];
        this.items = this.items.concat(items);
        
        if(items.length < 10) this.showButton = false;
        this.page++;
    }

    items!: any[];
    showButton = true;
    page = 1;

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
        this.tagsService.clear();
    }
}
