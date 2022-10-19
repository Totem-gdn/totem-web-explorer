import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'common-dropdown',
    templateUrl: './common-dropdown.component.html',
    styleUrls: ['./common-dropdown.component.scss']
})

export class CommonDropdownComponent {

    @ViewChild('dropdown') dropdown!: ElementRef;

    @Input() title = '';
    @Input() items!: any[];
    @Output() selectedToken = new EventEmitter<any>();
    menuActive = false;
    highlightedToken!: any;


    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }
    onChangeInput(event: any, title: string) {
        const token = {value: event.value, title: title};
        this.highlightedToken = token;
        this.selectedToken.emit(token);
    }
}