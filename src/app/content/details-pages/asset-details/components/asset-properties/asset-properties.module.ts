import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetPropertiesComponent } from "./asset-properties.component";



@NgModule({
    declarations: [
      AssetPropertiesComponent
    ],
    imports: [
      SharedModule,
      CarouselModule,
      FlexLayoutModule,
      NotFoundModule,
      TotemEntitySliderModule,
      MatIconModule
    ],
    exports: [
      AssetPropertiesComponent
    ]
})

export class AssetPropertiesModule {

}
