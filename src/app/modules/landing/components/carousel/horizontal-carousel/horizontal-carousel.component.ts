import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
    selector: 'horizontal-carousel',
    templateUrl: './horizontal-carousel.component.html',
})
export class HorizontalCarouselComponent {

    @Input() title = '';
    @Input() menu: undefined | string;
    @ViewChild('slider') slider!: ElementRef;

    // slider!: any;
    defaultTransform = 0;

    goNext() {
        this.defaultTransform = this.defaultTransform - 398;
        if (Math.abs(this.defaultTransform) >= this.slider.nativeElement.scrollWidth / 1.7) this.defaultTransform = 0;
        this.slider.nativeElement.style.transform = "translateX(" + this.defaultTransform + "px)";
    }
    goPrev() {

        if (Math.abs(this.defaultTransform) === 0) this.defaultTransform = 0;
        else this.defaultTransform = this.defaultTransform + 398;
        this.slider.nativeElement.style.transform = "translateX(" + this.defaultTransform + "px)";
    }

}
