import { NgModule } from "@angular/core";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
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
        SliderArrowModule
    ],
    exports: [
        SliderWireframeComponent
    ]
})

export class SliderWireframeModule {

}