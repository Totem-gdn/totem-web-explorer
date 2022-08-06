import { AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';

@Component({
    selector: 'horizontal-carousel',
    templateUrl: './horizontal-carousel.component.html',
    host: {
        '(window.resize)': 'onResize($event)'
    }
})
export class HorizontalCarouselComponent implements OnInit, AfterViewInit, OnDestroy {

    @Input() title = '';
    @Input() menu: undefined | string;
    @Input() items!: any[];

    @ViewChild('container') container!: ElementRef;
    @ViewChild('carousel') carousel!: ElementRef;
    @ViewChild('slider') slider!: ElementRef;

    resizeEvent!: Subscription;
    defaultTransform = 0;
    itemWidth!: number;
    itemsCount = 0;


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

    ngOnInit() {
        this.resizeEvent = fromEvent(window, 'resize').subscribe(onResize => {
            this.itemsVisible();
        });
    }

    ngAfterViewInit(): void {
        this.itemWidth = this.slider.nativeElement.children[0].offsetWidth;
        this.carousel.nativeElement.style.maxWidth = `${this.itemWidth * 4}px`;

        this.itemsVisible();
    }


    itemsVisible() {
            const containerOffset = this.container.nativeElement.offsetWidth;
            const itemsOnScreen = Math.floor(containerOffset / this.itemWidth);

            if(itemsOnScreen != this.itemsCount && containerOffset > this.itemWidth) {
                this.itemsCount = itemsOnScreen;
                this.carousel.nativeElement.style.width = `${this.itemWidth * itemsOnScreen}px`
            }
    }

    ngOnDestroy(): void {
        this.resizeEvent.unsubscribe();
    }

}
