import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { INPUT_TYPE } from "@app/core/models/enums/input-type.enum";
import { DNAField } from "@app/core/models/interfaces/dna-field.model";

@Component({
    selector: 'dna-filter-menu',
    templateUrl: './dna-filter-menu.component.html',
    styleUrls: ['./dna-filter-menu.component.scss']
})

export class DNAFilterMenuComponent implements OnInit {

    menuActive: boolean = false;

    @ViewChild('menuRef') menuRef!: ElementRef;
    @ViewChild('wrapper') wrapper!: ElementRef;

    @Input() inputType!: INPUT_TYPE;
    @Input() title: string = 'untitled';
    @Input() showSearch: boolean = false;
    @Input() values: string[] | undefined;

    // console.log()
    ngOnInit() {
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
        } else {
            if(this.showSearch) staticHeight += 61;

            const length = this.values?.length;
            if (!length || length > 4) {
                wrapper.height = `${staticHeight + 200}px`;
            } else {
                wrapper.height = `${staticHeight + length * 50}px`;
            }
        }
    }

    onChangeInput(e: any) {
        console.log(e);
    }

    onClickMenu() {

    }
}