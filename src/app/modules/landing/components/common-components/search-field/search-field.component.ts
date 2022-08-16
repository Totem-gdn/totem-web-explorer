import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: 'search-field',
    templateUrl: './search-field.component.html',
    styleUrls: ['./search-field.component.scss']
})

export class SearchFieldComponent {

    constructor(private router: Router) {

    }

    menuActive: boolean = false;
    searchActive = false;

    @Input() itemType: string = '';
    @Input() items: any = [{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},]



    onClickViewAll() {
        if(this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if(this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if(this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }

    onFocus() {
        this.searchActive = true;
        console.log('search active')
    }

    onBlur() {
        this.searchActive = false;
    }

    onClickMenu() {
        this.menuActive = !this.menuActive;
    }
}