import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from "@angular/core";

@Component({
    selector: 'common-dropdown',
    templateUrl: './common-dropdown.component.html',
    styleUrls: ['./common-dropdown.component.scss']
})

export class CommonDropdownComponent {

    @ViewChild('dropdown') dropdown!: ElementRef;

    @Output() selectedToken = new EventEmitter<any>();
    @Input() title = '';
    @Input() set items(items: any[]) {
        this._items = items;
        this.update();
    }

    _items!: any[];
    menuActive = false;
    highlightedToken!: any;


    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }

    update() {
    }
    onChangeInput(event: any, title: string) {
        this.menuActive = false;
        for(let i = 0; i < this._items.length; i++) {
            if(this._items[i].title == title) {
                this.highlightedToken = this._items[i];
                this.selectedToken.emit(this._items[i])
            }
        }
    }
}