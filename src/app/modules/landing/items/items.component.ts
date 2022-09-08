import { AfterViewInit, Component, ElementRef, Input, ViewChild } from "@angular/core";
import { ItemsService } from "@app/core/services/items/items.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    host: {
        class: 'px-[20px]'
      }
})

export class ItemsComponent implements AfterViewInit {

    @ViewChild('itemsWrapper') itemsWrapper!: ElementRef;

    @Input() items: any[] = [];

    ngAfterViewInit(): void {
        this.items.push(...[].constructor(this.addItems()));
    }

    onLoadMore() {
        this.items.push(...[].constructor(this.addItems()));
    }

    addItems() {
        const containerWidth = this.itemsWrapper.nativeElement.offsetWidth;
        
        let itemsToRender = (Math.floor(containerWidth / 330)) * 3;
        if(itemsToRender <= 0) {
            itemsToRender = 3;
        }
        this.numberOfItemsToFit();
        return itemsToRender;
    }
    numberOfItemsToFit() {
        const containerWidth = this.itemsWrapper.nativeElement.offsetWidth;
        const containerHeight = this.itemsWrapper.nativeElement.offseHeight;
        const numberOfItems = (Math.floor(containerWidth / 330) * Math.floor(containerHeight / 440))
        console.log(numberOfItems);
    }
    
}