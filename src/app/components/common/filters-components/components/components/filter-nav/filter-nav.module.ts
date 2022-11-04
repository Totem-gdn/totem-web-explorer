import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ClearAllModule } from "./clear-all/clear-all.module";
import { FilterSliderModule } from "./filter-slider/filter-slider.module";
import { FilterTagsModule } from "./filter-tags/filter-tags.module";
import { FilterUpdateModule } from "./filter-update/filter-update.module";
import { SortByModule } from "./sort-by/sort-by.module";


@NgModule({
    declarations: [
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SortByModule,
        ClearAllModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterTagsModule
    ],
    exports: [
        MatIconModule,
        SortByModule,
        ClearAllModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterTagsModule
    ]
})

export class FilterNavModule {

}
