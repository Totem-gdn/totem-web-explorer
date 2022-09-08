import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ItemCardModule } from "@app/modules/landing/components/common-components/cards/item-card/item-card.module";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { FilterNavModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-nav.module";
import { FilterTagsModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-tags/filter-tags.module";
import { FilterUpdateModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-update/filter-update.module";
import { ItemFilterModule } from "@app/modules/landing/components/filters-components/filters/item-filter/item-filter.module";

import { SharedModule } from "@app/shared/shared.module";
import { SwiperModule } from "swiper/angular";
import { UserItemsComponent } from "./user-items.component";
import { UserItemsRoutes } from "./user-items.routing";


@NgModule({
    declarations: [
        UserItemsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserItemsRoutes),

        FilterNavModule,
        ItemFilterModule,
        TotemButtonModule,
        FilterUpdateModule,
        FilterTagsModule,
        ItemCardModule
    ],
    exports: [
        UserItemsComponent
    ]
})

export class UserItemsModule {

}
