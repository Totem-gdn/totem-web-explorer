import { Component, ElementRef, Input, ViewChild } from "@angular/core";

@Component({
    selector: 'tooltip-popup',
    templateUrl: './tooltip-popup.component.html',
    styleUrls: ['./tooltip-popup.component.scss'],
    host: {
        class: 'absolute'
    }
})

export class TooltipPopupComponent {

    @ViewChild('menu') menuRef!: ElementRef;

    @Input() set data(data: string) {

        const base64regExp: RegExp = /^(?:[A-Za-z0-9+\/]{4})*(?:[A-Za-z0-9+\/]{4}|[A-Za-z0-9+\/]{3}=|[A-Za-z0-9+\/]{2}={2})$/gm;

        if (base64regExp.test(data)) {
        //   this.achievements[this.prevIndexSelected].base64Encoded = undefined;
        //   this.prevIndexSelected = index;
          this._data = Buffer.from(data, 'base64').toString('binary');
          console.log(this._data)
        } else {

        }
    }

    _data!: string;
}