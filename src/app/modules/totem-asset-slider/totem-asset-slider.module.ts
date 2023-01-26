import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemAssetCardModule } from "../totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "../totem-entity-selector/totem-entity-selector.module";
import { SelectedAssetCardModule } from "../totem-selected-asset-card/totem-selected-asset-card.module";
import { TotemAssetSliderComponent } from "./totem-asset-slider.component";




@NgModule({
    declarations: [
      TotemAssetSliderComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SelectedAssetCardModule,
        TotemAssetCardModule,
        TotemEntitySelectorModule
    ],
    exports: [
      TotemAssetSliderComponent
    ]
})

export class TotemAssetSliderModule {

}
