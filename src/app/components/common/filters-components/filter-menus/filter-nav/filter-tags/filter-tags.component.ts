import { Component, OnDestroy, OnInit } from "@angular/core";
import { FiltersService } from "@app/components/common/filters-components/filters.service";
import { InputTag } from "@app/core/models/interfaces/input-tag.model";
import { Tag } from "@app/core/models/interfaces/tag-interface.model";
import { Subscription } from "rxjs";


@Component({
    selector: 'filter-tags',
    templateUrl: './filter-tags.component.html',
    styleUrls: ['./filter-tags.component.scss'],
    host: {
        class: 'nav-item flex items-center'
    }
})

export class FilterTagsComponent implements OnInit, OnDestroy {

    constructor(private filtersService: FiltersService){}

    tags: InputTag[] = [];
    sub!: Subscription;

    ngOnInit(): void {
        this.sub = this.filtersService.tags$.subscribe(tags => {
            if(!tags) return;
            this.tags = tags;
        })
    }


    onRemoveTag(tag: InputTag) {
        this.filtersService.removeTag(tag);
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}