import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { max } from "rxjs";


@Component({
    selector: 'range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss']
})

export class RangeSliderComponent implements AfterViewInit {

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

    checkPosition() {
        const minValue = this.sliderThumbMin.nativeElement;
        const maxValue = this.sliderThumbMax.nativeElement;

        console.log(minValue.value, maxValue.value);
        if(minValue.value >= maxValue.value) {
            

            // if(minValue.value >= maxSliderValue) {
            //     minValue.value = maxSliderValue - 1;
            // }

            if(minValue.value == maxValue.value) {
                // const changeValue = minValue.value + 1;
                // console.log(changeValue);
                // maxValue.value = changeValue;
            }

            // if(maxValue.value > minValue.value) {
            //     maxValue.value -= 1;
            // }
        }
    }

    setMargins() {
        this.sliderTrackMax.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMax.nativeElement.style.marginLeft = this.marginLeft;

        this.sliderTrackMin.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMin.nativeElement.style.marginLeft = this.marginLeft;
    }

}