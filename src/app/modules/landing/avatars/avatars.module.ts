import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AvatarFilterModule } from "../components/filters-components/filters/avatars-filter/avatars-filter.module";
import { FilterSliderModule } from "../components/filters-components/filters/components/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filters-components/filters/components/filter-update/filter-update.module";
import { SortByModule } from "../components/filters-components/filters/components/sort-by/sort-by.module";
import { AvatarsListModule } from "../components/filters-components/lists/avatars-list/avatars-list.module";
import { AvatarsComponent } from "./avatars.component";
import { AvatarsRoutes } from "./avatars.routing";



@NgModule({
    declarations: [
        AvatarsComponent
    ],
    imports: [
        RouterModule.forChild(AvatarsRoutes),
        SharedModule,
        MatIconModule,

        AvatarsListModule,
        AvatarFilterModule,
        FilterUpdateModule,
        FilterSliderModule,
        SortByModule
    ],
    exports: [
        AvatarsComponent
    ]
})

export class AvatarsModule {

}