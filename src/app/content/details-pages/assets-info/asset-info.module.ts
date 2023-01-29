import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetInfoComponent } from "./asset-info.component";
import { ItemHistoryModule } from "./components/history/item-history.module";
import { ItemDescModule } from "./components/item-desc/item-desc.module";
import { ItemLegacyModule } from "./components/legacy/item-legacy.module";
import { ItemPropertiesModule } from "./components/properties/item-properties.module";



@NgModule({
    declarations: [
        AssetInfoComponent
    ],
    imports: [
        SharedModule,

        ItemDescModule,
        ItemLegacyModule,
        ItemHistoryModule,
        ItemPropertiesModule,
        CarouselModule,
        FlexLayoutModule,
        NotFoundModule,

        TotemEntitySliderModule
    ],
    exports: [
        AssetInfoComponent
    ]
})

export class AssetInfoModule {

}