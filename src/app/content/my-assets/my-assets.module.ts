
import { CdkCopyToClipboard, ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
import { TotemEntitySelectorModule } from "@app/modules/totem-entity-selector/totem-entity-selector.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { TotemSortButtonModule } from "@app/modules/totem-sort-button/totem-sort-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetLegacyTableModule } from "../details-pages/asset-details/components/asset-legacy-table/asset-legacy-table.module";
import { SortByComponent } from "../pages/components/sort-by/sort-by.component";
import { SortByModule } from "../pages/components/sort-by/sort-by.module";
import { MyAssetsComponent } from "./my-assets.component";
import { MyAssetsRoutes } from "./my-assets.routing";
import { UserAssetsModule } from "./user-assets/user-assets.module";

@NgModule({
    declarations: [
        MyAssetsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(MyAssetsRoutes),

        UserAssetsModule,
        AssetLegacyTableModule
    ],
    exports: [
        MyAssetsComponent
    ]
})

export class MyAssetsModule {

}
