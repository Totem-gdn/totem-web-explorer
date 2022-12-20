import { NgModule } from "@angular/core";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { GraphSliderModule } from "../filter-menu/graph-slider/graph-slider.module";
import { RangeSliderModule } from "../filter-menu/range-slider/range-slider.module";
import { GamesFilterMenuComponent } from "./games-filter-menu.component";


@NgModule({
    declarations: [
        GamesFilterMenuComponent
    ],
    imports: [
        SharedModule,
        GraphSliderModule,
        RangeSliderModule,
        SearchFieldModule
    ],
    exports: [
        GamesFilterMenuComponent
    ]
})

export class GamesFilterMenuModule {

}