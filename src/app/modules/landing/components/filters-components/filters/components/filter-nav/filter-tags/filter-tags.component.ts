import { Component } from "@angular/core";


@Component({
    selector: 'filter-tags',
    templateUrl: './filter-tags.component.html',
    styleUrls: ['./filter-tags.component.scss']
})

export class FilterTagsComponent {
    tags = [{title: 'Fire'},{title: 'Sword'}, {title: 'Red'}]
}