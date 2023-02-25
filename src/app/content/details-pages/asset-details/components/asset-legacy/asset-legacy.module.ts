import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { TotemEntitySliderModule } from "@app/modules/totem-entity-slider/totem-entity-slider.module";
import { TotemLegacyCardModule } from "@app/modules/totem-legacy-card/totem-legacy-card.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetLegacyComponent } from "./asset-legacy.component";



@NgModule({
    declarations: [
      AssetLegacyComponent
    ],
    imports: [
      SharedModule,
      CarouselModule,
      FlexLayoutModule,
      NotFoundModule,
      TotemLegacyCardModule,
      MatIconModule
    ],
    exports: [
      AssetLegacyComponent
    ]
})

export class AssetLegacyModule {

}
