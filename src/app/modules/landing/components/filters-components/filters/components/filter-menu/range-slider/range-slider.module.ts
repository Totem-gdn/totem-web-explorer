import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { RangeSliderComponent } from "./range-slider.component";



@NgModule({
    declarations: [
        RangeSliderComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        RangeSliderComponent
    ]
})

export class RangeSliderModule {

}
