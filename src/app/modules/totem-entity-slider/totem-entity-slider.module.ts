import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemAssetCardModule } from "../totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "../totem-entity-selector/totem-entity-selector.module";
import { TotemGameCardModule } from "../totem-game-card/totem-game-card.module";
import { SelectedAssetCardModule } from "../totem-selected-asset-card/totem-selected-asset-card.module";
import { TotemEntitySliderComponent } from "./totem-entity-slider.component";




@NgModule({
    declarations: [
      TotemEntitySliderComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SelectedAssetCardModule,
        TotemAssetCardModule,
        TotemEntitySelectorModule,
        TotemGameCardModule
    ],
    exports: [
      TotemEntitySliderComponent
    ]
})

export class TotemEntitySliderModule {

}
