import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { FilterNavComponent } from "./filter-nav.component";
import { FilterSliderModule } from "./filter-slider/filter-slider.module";
import { FilterTagsModule } from "./filter-tags/filter-tags.module";
import { FilterUpdateModule } from "./filter-update/filter-update.module";
import { SortByModule } from "./sort-by/sort-by.module";


@NgModule({
    declarations: [
        FilterNavComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SortByModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterTagsModule,
    ],
    exports: [
        FilterNavComponent,
        SortByModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterTagsModule,
    ]
})

export class FilterNavModule {

}