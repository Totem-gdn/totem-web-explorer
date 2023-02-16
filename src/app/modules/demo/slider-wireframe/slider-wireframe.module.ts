import { NgModule } from "@angular/core";
import { EventCardModule } from "@app/modules/landing/totem-home-page/components/home-components/totem-event-counter/event-card/event-card.module";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
import { TotemGameCardModule } from "@app/modules/totem-game-card/totem-game-card.module";
import { TotemLegacyCardModule } from "@app/modules/totem-legacy-card/totem-legacy-card.module";
import { SharedModule } from "@app/shared/shared.module";
import { SliderArrowModule } from "./slider-arrow/slider-arrow.module";
import { SliderWireframeComponent } from "./slider-wireframe.component";


@NgModule({
    declarations: [
        SliderWireframeComponent
    ],
    imports: [
        SharedModule,

        TotemAssetCardModule,
        TotemGameCardModule,
        SliderArrowModule,
        TotemLegacyCardModule,
        EventCardModule
    ],
    exports: [
        SliderWireframeComponent
    ]
})

export class SliderWireframeModule {

}