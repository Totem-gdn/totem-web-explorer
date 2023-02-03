import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemAssetCardModule } from "../totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "../totem-entity-selector/totem-entity-selector.module";
import { SelectedAssetCardModule } from "../totem-selected-asset-card/totem-selected-asset-card.module";
import { TotemStartScreenCardsComponent } from "./totem-start-screen-cards.component";




@NgModule({
    declarations: [
      TotemStartScreenCardsComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SelectedAssetCardModule,
        TotemAssetCardModule,
        TotemEntitySelectorModule
    ],
    exports: [
      TotemStartScreenCardsComponent
    ]
})

export class TotemStartScreenCardsModule {

}
