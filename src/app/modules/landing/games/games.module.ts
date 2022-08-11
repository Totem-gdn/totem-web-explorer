import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { FilterSliderModule } from "../components/filters/components/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filters/components/filter-update/filter-update.module";
import { GamesFilterModule } from "../components/filters/games-filter/games-filter.module";
import { SortByModule } from "../components/filters/components/sort-by/sort-by.module";
import { GamesListModule } from "../components/lists/games-list/games-list.module";
import { GamesComponent } from "./games.component";
import { GamesRoutes } from "./games.routing";



@NgModule({
    declarations: [
        GamesComponent
    ],
    imports: [
        RouterModule.forChild(GamesRoutes),
        SharedModule,
        MatIconModule,

        GamesListModule,
        GamesFilterModule,
        FilterUpdateModule,
        FilterSliderModule,
        SortByModule
    ],
    exports: [
        GamesComponent
    ]
})

export class GamesModule {

}