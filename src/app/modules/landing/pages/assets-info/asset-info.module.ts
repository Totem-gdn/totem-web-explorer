import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../components/utils/bg-circle/bg-circle.module";
import { TotemSpinnerModule } from "../../../../shared/totem-spinner/totem-spinner.module";
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
        BackgroundCircleModule,
        NotFoundModule,
        TotemSpinnerModule
    ],
    exports: [
        AssetInfoComponent
    ]
})

export class AssetInfoModule {

}