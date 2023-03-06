import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SortByModule } from "@app/content/pages/components/sort-by/sort-by.module";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "@app/modules/totem-entity-selector/totem-entity-selector.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { TotemSortButtonModule } from "@app/modules/totem-sort-button/totem-sort-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { UserAssetsComponent } from "./user-assets.component";

@NgModule({
    declarations: [
        UserAssetsComponent
    ],
    imports: [
        SharedModule,

        SortByModule,
        TotemEntitySliderModule,
        ClipboardModule,
        MatIconModule,
        TotemEntitySelectorModule,
        TotemAssetCardModule,
        TotemSortButtonModule
    ],
    exports: [
        UserAssetsComponent
    ]
})

export class UserAssetsModule {

}