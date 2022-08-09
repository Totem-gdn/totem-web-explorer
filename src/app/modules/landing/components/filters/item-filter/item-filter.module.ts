import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardModule } from "../../item-card/item-card.module";
import { FilterGameModule } from "../components/filter-game/filter-game.module";
import { FilterSliderModule } from "../components/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filter-update/filter-update.module";
import { ItemFilterComponent } from "./item-filter.component";



@NgModule({
    declarations: [
        ItemFilterComponent
    ],
    imports: [
        SharedModule,
        FilterSliderModule,
        FilterUpdateModule,
        FilterGameModule,
        ItemCardModule
    ],
    exports: [
        ItemFilterComponent
    ]
})

export class ItemFilterModule {

}