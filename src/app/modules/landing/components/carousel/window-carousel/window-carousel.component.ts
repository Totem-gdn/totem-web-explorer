import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'window-carousel',
    templateUrl: './window-carousel.component.html',
    styleUrls: ['./window-carousel.component.scss']
})
export class WindowCarouselComponent implements AfterViewInit {

    defaultTransform = 0;
    itemWidth!: number;
    itemsCount = 0;

    @ViewChild('carousel') carousel!: ElementRef;
    @ViewChild('slider') slider!: ElementRef;
    @ViewChild('circles') circles!: ElementRef;




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
        this.itemWidth = this.slider.nativeElement.children[0].offsetWidth;
        this.carousel.nativeElement.style.maxWidth = `${this.itemWidth}px`;
        this.itemsCount = this.slider.nativeElement.scrollWidth / this.itemWidth;
        const children = this.circles.nativeElement.children[0];
    }


}
