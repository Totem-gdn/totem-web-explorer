import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { GraphSliderComponent } from "./graph-slider.component";



@NgModule({
    declarations: [
        GraphSliderComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        FlexLayoutModule
    ],
    exports: [
        GraphSliderComponent
    ]
})

export class GraphSliderModule {
    
}