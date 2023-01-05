import { NgModule } from "@angular/core";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { GraphSliderModule } from "../components/graph-slider/graph-slider.module";
import { RangeSliderModule } from "../components/range-slider/range-slider.module";
import { DNAFilterMenuComponent } from "./dna-filter-menu.component";

@NgModule({
    declarations: [
        DNAFilterMenuComponent
    ],
    imports: [
        SharedModule,
        GraphSliderModule,
        RangeSliderModule,
        SearchFieldModule
    ],
    exports: [
        DNAFilterMenuComponent
    ]
})

export class DNAFilterMenuModule {

}