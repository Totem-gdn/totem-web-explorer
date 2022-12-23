import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { Subscription } from "rxjs";
import { FiltersService } from "../../../filters.service";

interface ValueField {
    key: number | string;
    value: number | string;
}

@Component({
    selector: 'dna-filter-menu',
    templateUrl: './dna-filter-menu.component.html',
    styleUrls: ['./dna-filter-menu.component.scss']
})

export class DNAFilterMenuComponent implements OnInit {

    constructor(private filtersService: FiltersService) { }

    @ViewChild('menuRef') menuRef!: ElementRef;
    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() inputType!: INPUT_TYPE;
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

    menuActive: boolean = false;
    items!: InputTag[] | undefined;

    sub!: Subscription;

    ngOnInit() {
        this.reset$();
    }

    reset$() {
        this.filtersService.reset$.subscribe(() => {
            console.log('reset');
            this.menuActive = false;
            this.handleMenuHeight();
        })
    }

    toggleMenu() {
        this.menuActive = !this.menuActive;
        this.handleMenuHeight();
    }

    handleMenuHeight() {
        const wrapper = this.wrapper.nativeElement.style;

        let staticHeight = 50;

        if (!this.menuActive) {
            wrapper.height = `${staticHeight}px`;
        } else if (this.inputType == INPUT_TYPE.RANGE) {
            wrapper.height = '130px';
        } else if (this.inputType == INPUT_TYPE.GRAPH) {
            wrapper.height = '250px';
        } else {
            staticHeight += 12;
            if (this.showSearch) staticHeight += 59;
            const menu = this.menuRef.nativeElement.style;
            const length = this.items?.length;

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

    handleMenuContent(filter: string) {
        console.log(filter)
    }
    isValueColor(value: string | undefined) {
        if (!value) return false;
        const s = new Option().style;
        s.color = value;
        return s.color !== '';
    }
}