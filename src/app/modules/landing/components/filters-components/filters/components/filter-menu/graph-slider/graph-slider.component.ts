import { Component, ElementRef, ViewChild } from "@angular/core";


@Component({
    selector: 'graph-slider',
    templateUrl: './graph-slider.component.html',
    styleUrls: ['./graph-slider.component.scss']
})

export class GraphSliderComponent {

    minValue = 0;
    maxValue = 0;

    marginLeft!: string;
    marginRight!: string;

    @ViewChild('sliderTrackMin') sliderTrackMin!: ElementRef;
    @ViewChild('sliderTrackMax') sliderTrackMax!: ElementRef;
    @ViewChild('sliderThumbMin') sliderThumbMin!: ElementRef;
    @ViewChild('sliderThumbMax') sliderThumbMax!: ElementRef;

    ngAfterViewInit() {
        this.update();
    }

    update() {
        this.checkThumbPosition();
        this.changeMaxValue();
        this.changeMinValue();
        this.setMargins();
    }

    changeMinValue() {
        console.log()
        const minValue = this.sliderThumbMin.nativeElement;

        const leftIndent = (minValue.value - minValue.min) * ((minValue.getBoundingClientRect().width - 18) / (minValue.max - minValue.min));
        this.marginLeft = `${leftIndent + 9}px`;
        this.minValue = minValue.value;
    }

    changeMaxValue() {
        const maxValue = this.sliderThumbMax.nativeElement;

        const rightIndent = (maxValue.max - maxValue.value) * ((maxValue.getBoundingClientRect().width - 18) / (maxValue.max - maxValue.min));
        this.marginRight = `${rightIndent + 9}px`;
        this.maxValue = maxValue.value;
    }

    checkThumbPosition() {
        const minValue = this.sliderThumbMin.nativeElement;
        const maxValue = this.sliderThumbMax.nativeElement;

     
        if(+minValue.value >= +maxValue.value && +maxValue.value == this.maxValue) {
            maxValue.value = +minValue.value + 1;
        }

        if(+minValue.value >= +maxValue.value && +minValue.value == this.minValue) {
            minValue.value = +maxValue.value - 1;
        }

        if(+maxValue.value == 0) {
            maxValue.value +maxValue.value + 1;
        }

        if(+minValue.value == +minValue.max) {
            minValue.value = maxValue.value - 1;
        }
    }

    setMargins() {
        this.sliderTrackMax.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMax.nativeElement.style.marginLeft = this.marginLeft;

        this.sliderTrackMin.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMin.nativeElement.style.marginLeft = this.marginLeft;
    }
}