import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { CarouselDropdownComponent } from "./carousel-dropdown.component";


@NgModule({
    declarations: [
        CarouselDropdownComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        CarouselDropdownComponent
    ]
})

export class CarouselDropdownModule {
    
}