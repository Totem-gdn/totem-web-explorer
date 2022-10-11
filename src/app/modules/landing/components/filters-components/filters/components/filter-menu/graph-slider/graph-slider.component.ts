import { Component, ElementRef, ViewChild, Input, OnDestroy, AfterViewInit, AfterViewChecked, ChangeDetectorRef } from "@angular/core";
import { FiltersService } from "@app/modules/landing/components/filters-components/services/filters.service";
import { TagsService } from "@app/modules/landing/components/filters-components/services/tags.service";
import { Subscription } from "rxjs";

export interface Items {
  amountOfItems: number,
  price: number,
  isInRange: boolean;
}

const Items: Items[] = [
  {
  amountOfItems: 40,
  price: 0,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 50,
  isInRange: false,
  },
  {
  amountOfItems: 47,
  price: 100,
  isInRange: false,
  },
  {
  amountOfItems: 56,
  price: 150,
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
  amountOfItems: 60,
  price: 550,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 600,
  isInRange: false,
  },
  {
  amountOfItems: 50,
  price: 650,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 700,
  isInRange: false,
  },
  {
  amountOfItems: 30,
  price: 750,
  isInRange: false,
  },
  {
  amountOfItems: 20,
  price: 800,
  isInRange: false,
  },
  {
  amountOfItems: 20,
  price: 850,
  isInRange: false,
  },
  {
  amountOfItems: 40,
  price: 900,
  isInRange: false,
  },
  {
  amountOfItems: 40,
  price: 950,
  isInRange: false,
  },
  {
  amountOfItems: 90,
  price: 1000,
  isInRange: false,
  },
]

@Component({
    selector: 'graph-slider',
    templateUrl: './graph-slider.component.html',
    styleUrls: ['./graph-slider.component.scss']
})

export class GraphSliderComponent implements OnDestroy, AfterViewInit {

    constructor(private filtersService: FiltersService,
                private tagsService: TagsService,private changeDetector : ChangeDetectorRef) {}

    minValue: number = 100;
    maxValue: number = 200;

    marginLeft!: string;
    marginRight!: string;

    items: Items[] = Items;
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
        this.checkRange();
    }

    ngAfterViewChecked() {
      this.changeDetector.detectChanges();
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
        this.sub = this.filtersService.onResetFilters$().subscribe(() => {
            this.tagsService.removeTagByReference(this.sliderThumbMin);
            this.sliderThumbMin.nativeElement.value = 100;
            this.sliderThumbMax.nativeElement.value = 200;
            this.checkThumbPosition();
            this.changeMaxValue();
            this.changeMinValue();
            this.setMargins();
        })
    }

    exportValue() {
        const value = `${this.title} ${this.minValue}-${this.maxValue}`;
        const reference = this.sliderThumbMin;
        const tag = {value: value, type: this.title, inputType: 'graph', reference: reference}
        this.tagsService.handleRangeTag(tag);
    }

    checkRange() {
        this.items.map((item: Items) => { item.price >= this.minValue && item.price <= this.maxValue ? item.isInRange = true : item.isInRange = false});
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
