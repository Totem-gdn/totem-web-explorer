import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GameCardModule } from "@app/modules/landing/components/common-components/cards/game-card/game-card.module";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { FilterNavModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-nav.module";
import { FilterTagsModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-tags/filter-tags.module";
import { FilterUpdateModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-update/filter-update.module";
import { GamesFilterModule } from "@app/modules/landing/components/filters-components/filters/games-filter/games-filter.module";
import { ItemFilterModule } from "@app/modules/landing/components/filters-components/filters/item-filter/item-filter.module";
import { GamesModule } from "@app/modules/landing/games/games.module";
import { SharedModule } from "@app/shared/shared.module";
import { UserGamesComponent } from "./user-games.component";
import { UserGamesRoutes } from "./user-games.routing";


@NgModule({
    declarations: [
        UserGamesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserGamesRoutes),

        FilterNavModule,
        GamesFilterModule,
        TotemButtonModule,
        FilterUpdateModule,
        FilterTagsModule,
        GameCardModule
    ],
    exports: [
        UserGamesComponent
    ]
})

export class UserGamesModule {

}