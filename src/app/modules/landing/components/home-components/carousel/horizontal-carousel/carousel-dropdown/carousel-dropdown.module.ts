import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SearchFieldModule } from "@app/modules/landing/components/common-components/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { CarouselDropdownComponent } from "./carousel-dropdown.component";


@NgModule({
    declarations: [
        CarouselDropdownComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SearchFieldModule,
    ],
    exports: [
        CarouselDropdownComponent
    ]
})

export class CarouselDropdownModule {
    
}