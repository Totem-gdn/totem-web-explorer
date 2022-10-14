import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../components/common-components/bg-circle/bg-circle.module";
import { ItemCardModule } from "../../components/common-components/cards/item-card/item-card.module";
import { CarouselModule } from "../../components/home-components/carousel/carousel.module";
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
        MatIconModule,

        ItemDescModule,
        ItemCardModule,
        ItemLegacyModule,
        ItemHistoryModule,
        ItemPropertiesModule,
        CarouselModule,
        FlexLayoutModule,
        BackgroundCircleModule
    ],
    exports: [
        AssetInfoComponent
    ]
})

export class AssetInfoModule {

}