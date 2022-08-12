import { Component, Input } from "@angular/core";


@Component({
    selector: 'carousel-dropdown',
    templateUrl: './carousel-dropdown.component.html'
})

export class CarouselDropdownComponent {
    menuActive: boolean = false;

    @Input() title: string = '';


    onClickMenu() {
        this.menuActive = !this.menuActive;
    }
}