import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from "@angular/core";
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

    items: any[] = [];

    ngAfterViewInit(): void {
        this.items.push(...[].constructor(this.itemsToRender()));
    }

    onLoadMore() {
        this.items.push(...[].constructor(this.itemsToRender()));
    }

    itemsToRender() {
        const containerWidth = this.itemsWrapper.nativeElement.offsetWidth;
        
        let itemsToRender = (Math.floor(containerWidth / 330)) * 3;
        if(itemsToRender <= 0) {
            itemsToRender = 3;
        }
        return itemsToRender;
    }
    
}