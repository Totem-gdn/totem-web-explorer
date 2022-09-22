import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SearchDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/search-dropdown/search-dropdown.module";
import { SharedModule } from "@app/shared/shared.module";
import { ClearAllModule } from "./clear-all/clear-all.module";
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
        ClearAllModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterTagsModule,
        SearchDropdownModule
    ],
    exports: [
        FilterNavComponent,
    ]
})

export class FilterNavModule {

}