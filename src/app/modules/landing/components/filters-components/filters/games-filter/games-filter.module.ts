import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardModule } from "../../../common-components/cards/item-card/item-card.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { FilterSliderModule } from "../components/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filter-update/filter-update.module";
import { GamesFilterComponent } from "./games-filter.component";



@NgModule({
    declarations: [
        GamesFilterComponent
    ],
    imports: [
        SharedModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterMenuModule,
        ItemCardModule
    ],
    exports: [
        GamesFilterComponent
    ]
})

export class GamesFilterModule {

}