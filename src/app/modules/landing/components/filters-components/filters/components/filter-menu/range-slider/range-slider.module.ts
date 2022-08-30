import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "@app/shared/shared.module";
import { RangeSliderComponent } from "./range-slider.component";



@NgModule({
    declarations: [
        RangeSliderComponent
    ],
    imports: [
        SharedModule,
        FlexLayoutModule
    ],
    exports: [
        RangeSliderComponent
    ]
})

export class RangeSliderModule {

}
