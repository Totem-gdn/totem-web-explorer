import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { ItemFilterModule } from "../components/filters/item-filter/item-filter.module";
import { ItemCardModule } from "../components/item-card/item-card.module";
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
    ],
})

export class ItemsModule {

}