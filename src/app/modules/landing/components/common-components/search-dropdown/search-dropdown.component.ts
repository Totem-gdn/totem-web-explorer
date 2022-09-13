import { DOCUMENT } from "@angular/common";
import { Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";


@Component({
    selector: 'search-dropdown',
    templateUrl: './search-dropdown.component.html',
    styleUrls: ['./search-dropdown.component.scss']
})

export class SearchDropdownComponent implements OnInit {

    constructor(private router: Router,
        @Inject(DOCUMENT) private document: Document) { }


    @Input() title: string = '';
    @Input() itemType: string = '';
    @Input() alwaysOpen = false;
    @ViewChild('menu') menu!: ElementRef;
    @ViewChild('dropdown') dropdown!: ElementRef;

    items = [{ name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' }, { name: 'Mr.Krabs', genre: 'horror' }, { name: 'GTA 6', genre: 'Arcade' }, { name: 'SontaCity', genre: 'Shooter' }, { name: 'Mineground', genre: 'Sandbox' },]
    menuActive: boolean = false;

    sub!: Subscription;

    ngOnInit() {
        if(this.alwaysOpen === true) this.menuActive = true;
    }

    onChangeInput(event: any) {
        const value = event.target.value;
        this.title = value;

        if(this.alwaysOpen) return;
        this.menuActive = false;
    }

    onClickMenu(event: any) {
        if(this.alwaysOpen) return;
        this.menuActive = !this.menuActive;
    }

    onClick(isClickedInside: any) {
        if(this.alwaysOpen) return;
        if (this.dropdown.nativeElement.__ngContext__ === isClickedInside.context && isClickedInside.isInside === false && this.menuActive === true) {
            this.menuActive = false;
        }
    }

    onClickViewAll() {
        if (this.itemType === 'item') {
            this.router.navigate(['/items']);
        } else if (this.itemType === 'game') {
            this.router.navigate(['/games']);
        } else if (this.itemType === 'avatar') {
            this.router.navigate(['/avatars']);
        }
    }

    onFocus() {
        console.log('focus')
    }

}