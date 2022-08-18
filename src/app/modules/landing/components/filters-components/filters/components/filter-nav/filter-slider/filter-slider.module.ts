import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { FilterSliderComponent } from "./filter-slider.component";


@NgModule({
    declarations: [
        FilterSliderComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        FilterSliderComponent
    ]
})

export class FilterSliderModule {

}