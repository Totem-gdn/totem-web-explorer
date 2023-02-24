import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetDetailsComponent } from "./asset-details.component";
import { AssetDetailsRoutes } from "./asset-details.routing";
import { AssetInformationModule } from "./components/asset-information/asset-information.module";



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
        RouterModule.forChild(AssetDetailsRoutes),
    ],
    exports: [
        AssetDetailsComponent
    ]
})

export class AssetDetailsModule {

}
