import { Component, OnDestroy, OnInit } from "@angular/core";
import { Tag } from "@app/core/models/tag-interface.model";
import { TagsService } from "@app/modules/landing/components/filters-components/services/tags.service";
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
        console.log('tags created')
        this.sub = this.tagsService.getTags$.subscribe(tags => {
            this.tags = tags;
            console.log(this.tags)
        })
    }


    onRemoveTag(tag: Tag) {
        this.tagsService.removeTag(tag);
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}