import { NgModule } from "@angular/core";
import { GameCardModule } from "@app/components/common/cards/game-card/game-card.module";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "@app/modules/totem-entity-selector/totem-entity-selector.module";
import { TotemGameCardModule } from "@app/modules/totem-game-card/totem-game-card.module";
import { TotemSortButtonModule } from "@app/modules/totem-sort-button/totem-sort-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { SortByModule } from "../sort-by/sort-by.module";
import { ReleasedGamesComponent } from "./released-games.component";

@NgModule({
    declarations: [
      ReleasedGamesComponent
    ],
    imports: [
        SharedModule,
        SortByModule,

        TotemAssetCardModule,
        TotemGameCardModule,
        TotemEntitySelectorModule,
        TotemSortButtonModule
    ],
    exports: [
      ReleasedGamesComponent
    ]
})

export class ReleasedGamesModule {

}
