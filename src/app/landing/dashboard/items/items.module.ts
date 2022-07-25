import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { ItemsComponent } from "./items.component";
import { ItemsRoutes } from "./items.routing";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ItemComponent } from "./item/item.component";
import { ItemCardModule } from "./item-card/item-card.module";


@NgModule({
    declarations: [
        ItemsComponent,
        ItemComponent,
    ],
    imports: [
        RouterModule.forChild(ItemsRoutes),
        SharedModule,
        MatIconModule,
        MatMenuModule,
        ItemCardModule
    ],
    exports: [RouterModule,]
})


export class ItemsModule {

}