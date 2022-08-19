import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { ClearAllModule } from "../components/filter-nav/clear-all/clear-all.module";
import { FilterSliderModule } from "../components/filter-nav/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filter-nav/filter-update/filter-update.module";
import { ItemFilterComponent } from "./item-filter.component";



@NgModule({
    declarations: [
        ItemFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule,
        FilterUpdateModule,
        FilterSliderModule,
        ClearAllModule
    ],
    exports: [
        ItemFilterComponent
    ]
})

export class ItemFilterModule {

}