import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SliderArrowComponent } from "./slider-arrow.component";

@NgModule({
    declarations: [
        SliderArrowComponent
    ],
    imports: [
        SharedModule,

        MatIconModule
    ],
    exports: [
        SliderArrowComponent
    ]
})

export class SliderArrowModule {

}