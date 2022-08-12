import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { FilterSliderModule } from "../components/filters/components/filter-slider/filter-slider.module";
import { FilterUpdateModule } from "../components/filters/components/filter-update/filter-update.module";
import { ItemFilterModule } from "../components/filters/item-filter/item-filter.module";
import { SortByModule } from "../components/filters/components/sort-by/sort-by.module";
import { ItemCardModule } from "../components/cards/item-card/item-card.module";
import { ItemListModule } from "../components/lists/item-list/item-list.module";
import { ItemsComponent } from "./items.component";
import { ItemsRoutes } from "./items.routing";




@NgModule({
    declarations: [
        ItemsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ItemsRoutes),

        ItemCardModule,
        ItemListModule,
        ItemFilterModule,
        FilterUpdateModule,
        FilterSliderModule,
        SortByModule
    ],
})

export class ItemsModule {

}