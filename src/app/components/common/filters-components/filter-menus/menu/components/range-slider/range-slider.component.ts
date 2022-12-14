import { AfterViewInit, Component, ElementRef, OnDestroy, Input, ViewChild, ChangeDetectorRef, AfterViewChecked } from "@angular/core";
import { FiltersService } from "@app/components/common/filters-components/filters.service";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { Subscription } from 'rxjs';


@Component({
    selector: 'range-slider',
    templateUrl: './range-slider.component.html',
    styleUrls: ['./range-slider.component.scss'],
    host: {
        class: 'rounded mt-8 items-center flex flex-col'
    }
})

export class RangeSliderComponent implements AfterViewChecked, AfterViewInit, OnDestroy {

    constructor(
        private changeDetector: ChangeDetectorRef,
        private filtersService: FiltersService) {
    }

    ngAfterViewChecked() {
        this.changeDetector.detectChanges();
      }

    minValue: number = 0;
    maxValue: number = 0;

    marginLeft!: string;
    marginRight!: string;

    @Input() title = '';
    sub!: Subscription;

    @ViewChild('sliderTrackMin') sliderTrackMin!: ElementRef;
    @ViewChild('sliderTrackMax') sliderTrackMax!: ElementRef;
    @ViewChild('sliderThumbMin') sliderThumbMin!: ElementRef;
    @ViewChild('sliderThumbMax') sliderThumbMax!: ElementRef;

    ngOnInit() {
        this.sub = this.filtersService.reset$.subscribe(() => {
            this.sliderThumbMin.nativeElement.value = 100;
            this.sliderThumbMax.nativeElement.value = 200;
            this.checkThumbPosition();
            this.changeMinValue();
            this.changeMaxValue();
            this.setMargins();
        })
    }

    exportValue() {
        const value = `${this.title} ${this.minValue}-${this.maxValue}`;
        const reference = this.sliderThumbMin;
        const tag: InputTag = { value: value, ref: reference };
        this.filtersService.addTag(tag, INPUT_TYPE.RANGE);
    }

    ngAfterViewInit() {
        this.checkThumbPosition();
        this.changeMinValue();
        this.changeMaxValue();
        this.setMargins();

        this.changeDetector.detectChanges();
    }

    update() {
        this.checkThumbPosition();
        this.changeMaxValue();
        this.changeMinValue();
        this.setMargins();

        this.exportValue();
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


        if (+minValue.value >= +maxValue.value && +maxValue.value == this.maxValue) {
            maxValue.value = +minValue.value + 1;
        }

        if (+minValue.value >= +maxValue.value && +minValue.value == this.minValue) {
            minValue.value = +maxValue.value - 1;
        }

        if (+maxValue.value == 0) {
            maxValue.value + maxValue.value + 1;
        }

        if (+minValue.value == +minValue.max) {
            minValue.value = maxValue.value - 1;
        }
    }

    setMargins() {
        this.sliderTrackMax.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMax.nativeElement.style.marginLeft = this.marginLeft;

        this.sliderTrackMin.nativeElement.style.marginRight = this.marginRight;
        this.sliderTrackMin.nativeElement.style.marginLeft = this.marginLeft;
    }


    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}
