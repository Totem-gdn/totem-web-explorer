import { Component, ElementRef, Input, ViewChild } from "@angular/core";


@Component({
    selector: 'form-dropdown',
    templateUrl: './form-dropdown.component.html',
    styleUrls: ['./form-dropdown.component.scss'],
    host: {
        class: 'max-w-[300px]'
    }
})

export class FormDropdownComponent {

    @Input() title = 'menu';
    @ViewChild('dropdown') dropdown!: ElementRef;
    menuActive = false;
    items = [{ name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' }, { name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' },]

    ngAfterViewInit(): void {
        // if(this.width) {
        //     this.dropdown.nativeElement.style.width = this.width;
        // }
    }

    onToggleMenu() {
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }

    onChangeInput(e: any) {

    }
}