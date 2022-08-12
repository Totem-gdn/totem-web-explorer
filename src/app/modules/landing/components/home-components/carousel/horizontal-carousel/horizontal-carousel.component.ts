import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'horizontal-carousel',
    templateUrl: './horizontal-carousel.component.html',
    host: {
        '(window.resize)': 'onResize($event)'
    }
})
export class HorizontalCarouselComponent implements AfterViewInit, OnDestroy {

    @Input() title = '';
    @Input() menuTitle: string = '';
    @Input() items = [1,2,3,4,5,6,7];;
    @Input() itemType = 'item';
    @Input() itemsCount = 4;

    @ViewChild('container') container!: ElementRef;
    @ViewChild('carousel') carousel!: ElementRef;
    @ViewChild('slider') slider!: ElementRef;

    resizeEvent!: Subscription;
    defaultTransform = 0;
    itemWidth!: number;


    goNext() {
        this.defaultTransform = this.defaultTransform - this.itemWidth;

        if(this.defaultTransform + this.slider.nativeElement.scrollWidth < this.carousel.nativeElement.offsetWidth) this.defaultTransform = 0;
        this.slider.nativeElement.style.transform = "translateX(" + this.defaultTransform + "px)";
    }

    goPrev() {
        if (this.defaultTransform === 0 || this.defaultTransform > 0) this.defaultTransform = 0;
        else this.defaultTransform = this.defaultTransform + this.itemWidth;
        this.slider.nativeElement.style.transform = "translateX(" + this.defaultTransform + "px)";
    }

    ngAfterViewInit(): void {
        this.resizeEvent = fromEvent(window, 'resize').subscribe(onResize => {
            this.itemsVisible();
        });
        this.itemWidth = this.slider.nativeElement.children[0].offsetWidth;

        this.itemsCount = Math.floor(this.container.nativeElement.offsetWidth / this.itemWidth);
        this.carousel.nativeElement.style.maxWidth = `${this.itemWidth * this.itemsCount}px`;

        this.itemsVisible();
    }


    itemsVisible() {
            const containerOffset = this.container.nativeElement.offsetWidth;
            let itemsOnScreen = Math.floor(containerOffset / this.itemWidth);

            if(itemsOnScreen * this.itemWidth == containerOffset && containerOffset > this.itemWidth) {
                itemsOnScreen -= 1;
            }

            if(itemsOnScreen != this.itemsCount && containerOffset > this.itemWidth) {
                this.itemsCount = itemsOnScreen;
                this.carousel.nativeElement.style.maxWidth = `${this.itemWidth * itemsOnScreen}px`
            }
    }

    ngOnDestroy(): void {
        this.resizeEvent.unsubscribe();
    }

}
