import { Component, OnDestroy, OnInit } from "@angular/core";
import { TagsService } from "@app/components/common/filters-components/services/tags.service";
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

    constructor(private tagsService: TagsService){}

    tags: any[] = [];
    sub!: Subscription;

    ngOnInit(): void {
        // this.sub = this.tagsService.getTags$.subscribe(tags => {
        //     this.tags = tags;
        // })
    }


    onRemoveTag(tag: Tag) {
        // this.tagsService.removeTag(tag);
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}