import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { FiltersService } from "@app/components/common/filters-components/services/filters.service";
import { TagsService } from "@app/components/common/filters-components/services/tags.service";
import { Subscription } from "rxjs";

export interface Items {
  amountOfItems: number,
  price: number,
  isInRange: boolean;
}

const Items: Items[] = [
  {
  amountOfItems: 40,
  price: 1,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 5,
  isInRange: false,
  },
  {
  amountOfItems: 47,
  price: 10,
  isInRange: false,
  },
  {
  amountOfItems: 56,
  price: 15,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 20,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 25,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 30,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 35,
  isInRange: false,
  },
  {
  amountOfItems: 10,
  price: 40,
  isInRange: false,
  },
  {
  amountOfItems: 10,
  price: 45,
  isInRange: false,
  },
  {
  amountOfItems: 60,
  price: 50,
  isInRange: false,
  },
  {
  amountOfItems: 60,
  price: 55,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 60,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 65,
  isInRange: false,
  },
  {
  amountOfItems: 60,
  price: 70,
  isInRange: false,
  },
  {
  amountOfItems: 40,
  price: 70,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 75,
  isInRange: false,
  },
  {
  amountOfItems: 20,
  price: 80,
  isInRange: false,
  },
  {
  amountOfItems: 15,
  price: 85,
  isInRange: false,
  },
  {
  amountOfItems: 40,
  price: 90,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 95,
  isInRange: false,
  },
  {
  amountOfItems: 10,
  price: 99,
  isInRange: false,
  }
]
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

    constructor(private filtersService: FiltersService,
                private tagsService: TagsService,private changeDetector : ChangeDetectorRef) {}

    minValue: number = 100;
    maxValue: number = 200;

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
        this.calculateRarity();
        this.setMargins();
        this.checkRange();

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
        // this.sub = this.filtersService.onResetFilters$().subscribe(() => {
        //     this.tagsService.removeTagByReference(this.sliderThumbMin);
        //     this.sliderThumbMin.nativeElement.value = 100;
        //     this.sliderThumbMax.nativeElement.value = 200;
        //     this.checkThumbPosition();
        //     this.changeMaxValue();
        //     this.changeMinValue();
        //     this.setMargins();
        // })
    }

    exportValue() {
        const value = `${this.title} ${this.minValue}-${this.maxValue}`;
        const reference = this.sliderThumbMin;
        const tag = {value: value, type: this.title, inputType: 'graph', reference: reference}
        // this.tagsService.handleRangeTag(tag);
    }

    checkRange() {
        this.items.map((item: Items) => { item.price >= this.minValue && item.price <= (+this.maxValue + 1) ? item.isInRange = true : item.isInRange = false});
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
