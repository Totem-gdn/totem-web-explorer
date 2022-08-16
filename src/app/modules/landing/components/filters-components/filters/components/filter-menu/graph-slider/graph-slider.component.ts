import { Component, ElementRef, ViewChild } from "@angular/core";


@Component({
    selector: 'graph-slider',
    templateUrl: './graph-slider.component.html',
    styleUrls: ['./graph-slider.component.scss']
})

export class GraphSliderComponent {

    minValue = 0;
    maxValue = 5;

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
        this.changeMaxValue();
        this.changeMinValue();
        this.checkPosition();
        this.setMargins();
    }

    changeMinValue() {
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

    checkPosition() {
        
        if(this.minValue > this.maxValue) {
            const maxSliderValue = this.sliderThumbMax.nativeElement.max;
            // this.maxValue
        }

        if(this.maxValue < this.minValue) {
            const minSliderValue = this.sliderThumbMin.nativeElement.min;
            // this.maxValue
        }
    }

    setMargins() {
        this.sliderTrackMax.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMax.nativeElement.style.marginLeft = this.marginLeft;

        this.sliderTrackMin.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMin.nativeElement.style.marginLeft = this.marginLeft;
    }
}