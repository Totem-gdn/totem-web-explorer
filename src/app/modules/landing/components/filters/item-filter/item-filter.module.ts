import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardModule } from "../../item-card/item-card.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
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
        FilterMenuModule,
        ItemCardModule
    ],
    exports: [
        ItemFilterComponent
    ]
})

export class ItemFilterModule {

}