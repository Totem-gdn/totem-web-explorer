import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
    selector: 'common-dropdown',
    templateUrl: './common-dropdown.component.html',
    styleUrls: ['./common-dropdown.component.scss']
})

export class CommonDropdownComponent {

    @ViewChild('dropdown') dropdown!: ElementRef;

    @Input() title = '';
    @Input() items!: any[];
    menuActive = false;


    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }
    onChangeInput(value: any) {
        console.log(value);
    }
}