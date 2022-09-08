import { Component, OnDestroy, OnInit } from "@angular/core";
import { TagsService } from "@app/core/services/filters/tags.service";
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
        })
    }

    onRemoveTag(tag: string) {
        this.tagsService.removeTag(tag);
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }
}