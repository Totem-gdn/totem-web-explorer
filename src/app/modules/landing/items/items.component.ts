import { AfterViewInit, Component, ElementRef, Input, ViewChild, AfterViewChecked } from "@angular/core";

@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    host: {
        class: 'px-[20px]'
      }
})

export class ItemsComponent implements AfterViewInit, AfterViewChecked {

    @ViewChild('itemsWrapper') itemsWrapper!: ElementRef;

    @Input() items: any[] = [];

    ngAfterViewInit(): void {
        this.items.push(...[].constructor(this.addItems()));
    }

    onLoadMore() {
        this.items.push(...[].constructor(this.addItems()));
    }

    ngAfterViewChecked(): void {
        const width = this.itemsWrapper.nativeElement.offsetWidth;
        console.log(width);

        if(width > 880) {
            this.itemsWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr 1fr';
        }
        if(width <= 880) {
            this.itemsWrapper.nativeElement.style.gridTemplateColumns = '1fr 1fr';
        }
        if(width <= 560) {
            this.itemsWrapper.nativeElement.style.gridTemplateColumns = '1fr';
        }
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