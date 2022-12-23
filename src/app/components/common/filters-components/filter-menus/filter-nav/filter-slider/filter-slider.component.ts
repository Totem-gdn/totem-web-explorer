import { Component, OnDestroy, OnInit } from "@angular/core";
import { FiltersService } from "@app/components/common/filters-components/filters.service";
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
        this.filtersService.dropupActive$.subscribe(isOpen => {
            this.isMenuOpen = isOpen;
        })
    }

    onToggleMenu() {
        this.filtersService.dropupActive = !this.filtersService.dropupActive;
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }
}