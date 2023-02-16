import { Component, ElementRef } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'explore-dropdown',
    templateUrl: './explore-dropdown.component.html',
    styleUrls: ['./explore-dropdown.component.scss'],

})

export class ExploreDropdownComponent {
    constructor(private elRef: ElementRef,
                private router: Router) {}
    // items = ['items', 'avatars', 'games'];


    // close() {
    //     console.log('close')
    //     this.elRef.nativeElement.style.display = 'none';
    // }
    navigate(){
        this.router.navigate(['items'])
    }
}