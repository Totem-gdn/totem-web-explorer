import { Component, Input } from "@angular/core";

@Component({
    selector: 'app-item-card',
    templateUrl: './item-card.component.html'
})

export class ItemCardComponent {

    @Input() item: any;
}