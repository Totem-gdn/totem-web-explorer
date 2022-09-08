import { Component } from "@angular/core";
import { FiltersService } from "@app/core/services/filters/filters.service";
import { TagsService } from "@app/core/services/filters/tags.service";


@Component({
    selector: 'clear-all',
    templateUrl: './clear-all.component.html',
    styleUrls: ['./clear-all.component.scss']
})

export class ClearAllComponent {

    constructor(private tagsService: TagsService,
                private filtersService: FiltersService){}

    onClearAll() {
        this.filtersService.resetFilters();
    }
}