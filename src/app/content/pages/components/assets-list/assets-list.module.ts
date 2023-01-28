import { NgModule } from "@angular/core";
import { GameCardModule } from "@app/components/common/cards/game-card/game-card.module";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "@app/modules/totem-entity-selector/totem-entity-selector.module";
import { TotemGameCardModule } from "@app/modules/totem-game-card/totem-game-card.module";
import { SharedModule } from "@app/shared/shared.module";
import { SortByModule } from "../sort-by/sort-by.module";
import { AssetsListComponent } from "./assets-list.component";

@NgModule({
    declarations: [
        AssetsListComponent
    ],
    imports: [
        SharedModule,
        SortByModule,

        TotemAssetCardModule,
        TotemGameCardModule,
        TotemEntitySelectorModule
    ],
    exports: [
        AssetsListComponent
    ]
})

export class AssetsListModule {

}