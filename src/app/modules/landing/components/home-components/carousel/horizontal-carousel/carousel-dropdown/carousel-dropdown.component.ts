import { Component, Input } from "@angular/core";


@Component({
    selector: 'carousel-dropdown',
    templateUrl: './carousel-dropdown.component.html',
    styleUrls: ['./carousel-dropdown.component.scss']
})

export class CarouselDropdownComponent {
    menuActive: boolean = false;

    @Input() title: string = '';

    items = [{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},]


    onClickMenu() {
        this.menuActive = !this.menuActive;
    }
}