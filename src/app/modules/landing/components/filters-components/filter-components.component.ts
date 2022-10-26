import { Component, Input, ViewChild, ElementRef, AfterViewChecked, AfterViewInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ComboBoxService } from '@app/core/services/combobox-state.service';
import { TagsService } from './services/tags.service';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
})

export class FilterComponentsComponent implements OnDestroy {

    constructor(private tagsService: TagsService, private comboBoxService: ComboBoxService) {}

    @Output() loadMore = new EventEmitter<number>();
    @Output() sort = new EventEmitter<string>();
    @Input() itemType = 'item';
    @Input() showUpdate = true;
    @Input() showSort = true;

    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() set setItems(items: any[] | undefined | null) {
        // if(items == null) return;
        console.log('set items')
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

    items: any[] | undefined | null = undefined;
    showButton = true;
    page = 1;



    onSort(sortMethod: any) {
        this.sort.emit(sortMethod);
        this.items = undefined;
    }

    selectGame(event: any) {
      console.log(event);
      this.comboBoxService.updateSelectedGame(event);
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
        this.tagsService.clear();
    }
}
