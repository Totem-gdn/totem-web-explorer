import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: 'carousel-dropdown',
    templateUrl: './carousel-dropdown.component.html',
    styleUrls: ['./carousel-dropdown.component.scss']
})

export class CarouselDropdownComponent {

    constructor(private router: Router) {

    }

    menuActive: boolean = false;

    @Input() title: string = '';
    @Input() itemType: string = '';

    items = [{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},]


    onClickViewAll() {
        if(this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if(this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if(this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }

    onClickMenu() {
        this.menuActive = !this.menuActive;
    }
}