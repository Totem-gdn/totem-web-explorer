import { Component, ElementRef, Input, OnDestroy, ViewChild } from "@angular/core";
import { Router } from "@angular/router";


@Component({
    selector: 'search-dropdown',
    templateUrl: './search-dropdown.component.html',
    styleUrls: ['./search-dropdown.component.scss']
})

export class SearchDropdownComponent {

    constructor(private router: Router) {}

    menuActive: boolean = false;

    @Input() title: string = '';
    @Input() itemType: string = '';
    @ViewChild('menu') menu!: ElementRef;

    items = [{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},{name: 'Mr.Krabs', genre: 'horror'}, {name: 'GTA 6', genre: 'Arcade'}, {name: 'SontaCity', genre: 'Shooter'}, {name: 'Mineground', genre: 'Sandbox'},]

    onChangeInput(event:any) {
        const value = event.target.value;
        this.title = value;
    }

    onClickMenu(event: any) {
        this.menuActive = !this.menuActive;
    }

    onClickOutside(event: any) {
        console.log('clickd outside')
        console.log(event);
        this.menuActive = false;
    }

    onClickViewAll() {
        if(this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if(this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if(this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }

}