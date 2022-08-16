import { Component, OnInit, ViewEncapsulation } from "@angular/core";


@Component({
    selector: 'app-items',
    templateUrl: './items.component.html',
    styleUrls: ['./items.component.scss'],
    encapsulation: ViewEncapsulation.None,
})

export class ItemsComponent {

    items = [1,1,1,1,1,1,1,1,1];

    
    
}