import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { FilterNavModule } from "../components/filters-components/filters/components/filter-nav/filter-nav.module";
import { GamesFilterModule } from "../components/filters-components/filters/games-filter/games-filter.module";
import { GamesListModule } from "../components/filters-components/lists/games-list/games-list.module";
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
        FilterNavModule
    ],
    exports: [
        GamesComponent
    ]
})

export class GamesModule {

}