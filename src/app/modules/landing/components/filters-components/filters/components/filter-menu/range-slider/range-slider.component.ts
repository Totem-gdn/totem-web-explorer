import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import { max } from "rxjs";

export interface Items {
  amountOfItems: number,
  price: number,
  isInRange: boolean;
}

const Items: Items[] = [
  {
  amountOfItems: 40,
  price: 99,
  isInRange: false,
  },
  {
  amountOfItems: 40,
  price: 120,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 200,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 250,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 300,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 350,
  isInRange: false,
  },
  {
  amountOfItems: 10,
  price: 400,
  isInRange: false,
  },
  {
  amountOfItems: 10,
  price: 450,
  isInRange: false,
  },
  {
  amountOfItems: 60,
  price: 500,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 600,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 700,
  isInRange: false,
  },
  {
  amountOfItems: 20,
  price: 800,
  isInRange: false,
  },
  {
  amountOfItems: 40,
  price: 900,
  isInRange: false,
  },
  {
  amountOfItems: 90,
  price: 999,
  isInRange: false,
  },
]

@Component({
    selector: 'range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss']
})

export class RangeSliderComponent implements AfterViewInit {

    minValue = 0;
    maxValue = 0;

    marginLeft!: string;
    marginRight!: string;

    items: Items[] = Items;

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
        this.checkRange()
    }

    checkRange() {
      this.items.map((item: Items) => { item.price > this.minValue && item.price <= this.maxValue ? item.isInRange = true : item.isInRange = false});
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
