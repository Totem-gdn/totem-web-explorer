import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { SharedModule } from "@app/shared/shared.module";
import { ItemPropertiesModule } from "../assets-info/components/properties/item-properties.module";
import { AssetDetailsComponent } from "./asset-details.component";
import { AssetInformationModule } from "./components/asset-information/asset-information.module";
import { AssetLegacyModule } from "./components/asset-legacy/asset-legacy.module";
import { AssetOwnershipHistoryModule } from "./components/asset-ownership-history/asset-ownership-history.module";
import { AssetPropertiesModule } from "./components/asset-properties/asset-properties.module";



@NgModule({
    declarations: [
      AssetDetailsComponent
    ],
    imports: [
        SharedModule,
        CarouselModule,
        FlexLayoutModule,
        NotFoundModule,
        TotemEntitySliderModule,

        AssetInformationModule,
        AssetPropertiesModule,
        ItemPropertiesModule,
        AssetLegacyModule,
        AssetOwnershipHistoryModule,
    ],
    exports: [
        AssetDetailsComponent
    ]
})

export class AssetDetailsModule {

}
