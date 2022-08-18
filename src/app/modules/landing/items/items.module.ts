import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { SwiperModule } from "swiper/angular";
import { ItemCardModule } from "../components/common-components/cards/item-card/item-card.module";
import { SearchDropdownModule } from "../components/common-components/search-dropdown/search-dropdown.module";
import { FilterNavModule } from "../components/filters-components/filters/components/filter-nav/filter-nav.module";
import { ItemFilterModule } from "../components/filters-components/filters/item-filter/item-filter.module";
import { ItemListModule } from "../components/filters-components/lists/item-list/item-list.module";
import { CarouselModule } from "../components/home-components/carousel/carousel.module";
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
        FilterNavModule,
        CarouselModule,
        SearchDropdownModule,
        
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        SwiperModule,
    ],
})

export class ItemsModule {

}