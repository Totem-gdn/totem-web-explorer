import { Component, EventEmitter, Output } from "@angular/core";

@Component({
    selector: 'filter-slider',
    templateUrl: './filter-slider.component.html',
    styleUrls: ['./filter-slider.component.scss']
})

export class FilterSliderComponent {

    toggleMenu = false;
    @Output() menuOpen = new EventEmitter<boolean>(false);


    onToggleMenu() {
        this.toggleMenu = !this.toggleMenu;
        this.menuOpen.emit(this.toggleMenu);
    }
}