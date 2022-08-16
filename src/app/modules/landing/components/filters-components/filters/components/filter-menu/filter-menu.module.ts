import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatExpansionModule } from '@angular/material/expansion';
import { SharedModule } from "@app/shared/shared.module";
import { FilterMenuComponent } from "./filter-menu.component";
import { RangeSliderModule } from "./range-slider/range-slider.module";
import { SearchFieldModule } from "@app/modules/landing/components/common-components/search-field/search-field.module";
import { GraphSliderModule } from "./graph-slider/graph-slider.module";



@NgModule({
    declarations: [
        FilterMenuComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        MatExpansionModule,
        RangeSliderModule,
        GraphSliderModule,
        SearchFieldModule
    ],
    exports: [
        FilterMenuComponent
    ]
})

export class FilterMenuModule {

}