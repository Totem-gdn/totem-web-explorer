import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { FiltersService } from "@app/components/common/filters-components/filters.service";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { Subscription } from "rxjs";

export interface Items {
  amountOfItems: number,
  price: number,
  isInRange: boolean;
}
interface RangeItem {
    amountOfItems: number;
    price: number;
    isInRange: boolean;
}

@Component({
    selector: 'graph-slider',
    templateUrl: './graph-slider.component.html',
    styleUrls: ['./graph-slider.component.scss'],
    host: {
        class: 'rounded mt-8 items-center flex flex-col'
    }
})

export class GraphSliderComponent implements OnDestroy, AfterViewInit {

    constructor(private changeDetector : ChangeDetectorRef,
                private filtersService: FiltersService) {}

    minValue: number = 10;
    maxValue: number = 20;

    marginLeft!: string;
    marginRight!: string;

    items: RangeItem[] = [];
    sub!: Subscription;

    @Input() title = '';

    @ViewChild('sliderTrackMin') sliderTrackMin!: ElementRef;
    @ViewChild('sliderTrackMax') sliderTrackMax!: ElementRef;
    @ViewChild('sliderThumbMin') sliderThumbMin!: ElementRef;
    @ViewChild('sliderThumbMax') sliderThumbMax!: ElementRef;

    ngAfterViewInit() {
        this.checkThumbPosition();
        this.changeMaxValue();
        this.changeMinValue();
        this.setMargins();
        this.calculateRarity();
        this.checkRange();
        setTimeout(() =>{
            this.checkThumbPosition();
        this.changeMaxValue();
        this.changeMinValue();
        this.setMargins();
        this.checkRange();
        },100)

        this.changeDetector.detectChanges();
    }

    calculateRarity() {
        const min = this.sliderThumbMin.nativeElement.min;
        const max = this.sliderThumbMax.nativeElement.max;
        const step = Math.floor((max - min) / 19);

        for(let i = +min; i <= +max; i += +step) {
            const randomNumberOfItems = (Math.random() * 100);
            const item: RangeItem = {price: i, isInRange: false, amountOfItems: randomNumberOfItems}
            this.items.push(item);
        }
    }

    update() {
        this.checkThumbPosition();
        this.changeMaxValue();
        this.changeMinValue();
        this.setMargins();
        this.checkRange();

        this.exportValue();
    }

    ngOnInit() {
        this.sub = this.filtersService.reset$.subscribe(() => {
            this.sliderThumbMin.nativeElement.value = 10;
            this.sliderThumbMax.nativeElement.value = 20;
            this.checkThumbPosition();
            this.changeMaxValue();
            this.changeMinValue();
            this.setMargins();
        })
    }

    exportValue() {
        const value = `${this.title} ${this.minValue}-${this.maxValue}`;
        const reference = this.sliderThumbMin;
        const tag: InputTag = { value: value, ref: reference };
        this.filtersService.addTag(tag, INPUT_TYPE.RANGE);
    }

    checkRange() {
        this.items.map((item: Items) => { item.price >= this.minValue && item.price <= (+this.maxValue + 1) ? item.isInRange = true : item.isInRange = false});
      }

    changeMinValue() {
        const minValue = this.sliderThumbMin.nativeElement;

        const leftIndent = (minValue.value - minValue.min) * ((minValue.getBoundingClientRect().width - 14) / (minValue.max - minValue.min));
        this.marginLeft = `${leftIndent + 9}px`;
        this.minValue = minValue.value;
    }

    changeMaxValue() {
        const maxValue = this.sliderThumbMax.nativeElement;

        const rightIndent = (maxValue.max - maxValue.value) * ((maxValue.getBoundingClientRect().width - 14) / (maxValue.max - maxValue.min));
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

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}
