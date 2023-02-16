import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemEntitySelectorModule } from "../totem-entity-selector/totem-entity-selector.module";
import { SelectedAssetCardModule } from "../totem-selected-asset-card/totem-selected-asset-card.module";
import { TotemStartScreenAssetCardModule } from "../totem-start-screen-asset-card/totem-start-screen-asset-card.module";
import { TotemStartScreenCardsComponent } from "./totem-start-screen-cards.component";




@NgModule({
    declarations: [
      TotemStartScreenCardsComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SelectedAssetCardModule,
        TotemStartScreenAssetCardModule,
        TotemEntitySelectorModule
    ],
    exports: [
      TotemStartScreenCardsComponent
    ]
})

export class TotemStartScreenCardsModule {

}
