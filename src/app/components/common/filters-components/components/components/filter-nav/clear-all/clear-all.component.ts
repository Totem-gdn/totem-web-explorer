import { Component } from "@angular/core";
import { FiltersService } from "@app/components/common/filters-components/services/filters.service";


@Component({
    selector: 'clear-all',
    templateUrl: './clear-all.component.html',
    styleUrls: ['./clear-all.component.scss']
})

export class ClearAllComponent {

    constructor(
        private filtersService: FiltersService
    ) { }

    onClearAll() {
        // this.filtersService.resetFilters();
    }
}