import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { GameCardModule } from "../components/common-components/cards/game-card/game-card.module";
import { FilterNavModule } from "../components/filters-components/filters/components/filter-nav/filter-nav.module";
import { FilterTagsModule } from "../components/filters-components/filters/components/filter-nav/filter-tags/filter-tags.module";
import { FilterUpdateModule } from "../components/filters-components/filters/components/filter-nav/filter-update/filter-update.module";
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
        FilterNavModule,
        GamesFilterModule,
        GameCardModule,
        FilterUpdateModule,
        FilterTagsModule
    ],
    exports: [
        GamesComponent
    ]
})

export class GamesModule {

}