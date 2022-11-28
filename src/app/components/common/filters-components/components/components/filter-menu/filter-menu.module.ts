import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from "@angular/material/icon";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { FilterMenuComponent } from "./filter-menu.component";
import { GraphSliderModule } from "./graph-slider/graph-slider.module";
import { RangeSliderModule } from "./range-slider/range-slider.module";



@NgModule({
    declarations: [
        FilterMenuComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        MatExpansionModule,
        FormsModule,

        RangeSliderModule,
        GraphSliderModule,
        SearchFieldModule,
    ],
    exports: [
        FilterMenuComponent
    ]
})

export class FilterMenuModule {

}