import { Component, OnDestroy, OnInit } from "@angular/core";
import { FiltersService } from "@app/modules/landing/components/filters-components/services/filters.service";
import { Subscription } from "rxjs";

@Component({
    selector: 'filter-slider',
    templateUrl: './filter-slider.component.html',
    styleUrls: ['./filter-slider.component.scss']
})

export class FilterSliderComponent implements OnInit, OnDestroy {

    constructor(private filtersService: FiltersService) {}

    sub!: Subscription;
    isMenuOpen!: boolean;

    ngOnInit() {
        this.filtersService.dropupOpen$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
        })
    }

    onToggleMenu() {
        console.log(!this.filtersService.dropupOpen);
        this.filtersService.dropupOpen = !this.filtersService.dropupOpen;
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}