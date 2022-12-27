import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { Subscription } from "rxjs";
import { FiltersService } from "../../../filters.service";


@Component({
    selector: 'dna-filter-menu',
    templateUrl: './dna-filter-menu.component.html',
    styleUrls: ['./dna-filter-menu.component.scss']
})

export class DNAFilterMenuComponent implements OnInit, AfterViewInit {

    constructor(private filtersService: FiltersService,
                private changeDetector: ChangeDetectorRef) { }

    @ViewChild('menuRef') menuRef!: ElementRef;
    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() inputType: INPUT_TYPE = INPUT_TYPE.CHECKBOX;
    @Input() title: string = 'untitled';
    @Input() showSearch: boolean = false;

    @Input() set values(values: any[] | undefined) {
        if (!values) return;
        this.items = [];

        for (let value of values) {
            if (value.key) this.items.push({ value: value.key, group: this.title });
            else this.items.push({ value: value, group: this.title })
        }
    };

    items!: InputTag[] | undefined;
    menuActive: boolean = false;

    sub!: Subscription;
    itemsNoFound = false;
    resetFilters = false;

    ngOnInit() {
        this.reset$();
    }
    ngAfterViewInit(): void {
        this.changeDetector.detectChanges();
    }

    reset$() {
        this.filtersService.reset$.subscribe(() => {
            this.menuActive = false;
            this.handleMenuHeight();
        })
    }

    toggleMenu() {
        this.menuActive = !this.menuActive;
        this.handleMenuHeight();
    }

    handleMenuHeight(customLength: number | null = null) {

        if(!this.menuActive) this.resetFilters = !this.resetFilters;
        const wrapper = this.wrapper.nativeElement.style;

        let staticHeight = 50;

        if (!this.menuActive) {
            wrapper.height = `${staticHeight}px`;
        } else if (this.inputType == INPUT_TYPE.RANGE) {
            wrapper.height = '130px';
        } else if (this.inputType == INPUT_TYPE.GRAPH) {
            wrapper.height = '250px';
        } else {
            const menu = this.menuRef.nativeElement.style;
            const length = customLength != null ? customLength : this.items?.length;

            if (this.showSearch) staticHeight += 59;
            if (length) staticHeight += 12;

            if (!length) {
                wrapper.height = `${staticHeight}px`;
            } else if (length > 4) {
                wrapper.height = `${staticHeight + 200}px`;
                menu.height = '200px';
            } else {
                wrapper.height = `${staticHeight + length * 50}px`;
                menu.height = `${length * 50}px`;
            }
        }
    }

    onChangeInput(e: any, item: InputTag) {
        item.ref = e.target;

        if(e.target.checked == false) {
            this.filtersService.removeTag(item);
            return;
        }

        this.filtersService.addTag(item, this.inputType);
    }

    filterMenuContent(filter: string) {
        if(!this.items || !this.menuRef) return;
        const items = this.menuRef.nativeElement.getElementsByClassName('menu-item');
        const matchedItems = this.items.filter(item => item.value.includes(filter));

        for(let i = 0; i < items.length; i++) {
            if(this.items[i].value.includes(filter)) {
                items[i].style.display = 'flex';
            } else {
                items[i].style.display = 'none';
            }
        }
        if(matchedItems.length == 0) {
            this.itemsNoFound = true;
            this.handleMenuHeight(1)
        } else {
            this.itemsNoFound = false;
            this.handleMenuHeight(matchedItems.length)
        }
    }

    isValueColor(value: string | undefined) {
        if (!value) return false;
        const s = new Option().style;
        s.color = value;
        return s.color !== '';
    }
}