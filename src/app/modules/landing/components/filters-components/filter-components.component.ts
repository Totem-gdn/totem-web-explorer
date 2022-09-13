import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { FiltersService } from '@app/core/services/filters/filters.service';

@Component({
    selector: 'filter-components',
    templateUrl: './filter-components.component.html',
})

export class FilterComponentsComponent {

    constructor(private filterService: FiltersService) {

    }

    @Input() filterType = 'item';
    @Input() mode = 'active';
    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() items: any[] | undefined; 

    async ngAfterViewInit() {

        if(this.mode != 'active') {
            if(this.items === undefined) this.items = [];
            this.items.push(...[].constructor(this.addItems()));
        }
    }

    onLoadMore() {
        if(this.mode != 'active') {
            if(this.items === undefined) this.items = [];
            this.items.push(...[].constructor(this.addItems()));
        }
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

    addItems() {
        const containerWidth = this.wrapper.nativeElement.offsetWidth;
        
        let itemsToRender = (Math.floor(containerWidth / 330)) * 3;
        if(itemsToRender <= 0) {
            itemsToRender = 3;
        }
        this.numberOfItemsToFit();
        console.log('items to render')
        return itemsToRender;
    }
    numberOfItemsToFit() {
        const containerWidth = this.wrapper.nativeElement.offsetWidth;
        const containerHeight = this.wrapper.nativeElement.offseHeight;
        const numberOfItems = (Math.floor(containerWidth / 330) * Math.floor(containerHeight / 440))
    }

    ngOnDestroy() {
        this.filterService.resetFilters();
    }
}