import { Component, EventEmitter, Output } from "@angular/core";


@Component({
    selector: 'filter-nav',
    templateUrl: './filter-nav.component.html',
    styleUrls: ['./filter-nav.component.scss']
})


export class FilterNavComponent {

    @Output() menuOpened = new EventEmitter<boolean>();

    onToggleMenu(isOpened: boolean) {
        this.menuOpened.emit(isOpened);
    }
    
}