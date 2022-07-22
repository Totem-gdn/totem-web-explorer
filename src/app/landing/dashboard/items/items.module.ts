import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { ItemsComponent } from "./items.component";
import { ItemsRoutes } from "./items.routing";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { ItemComponent } from "./item/item.component";


@NgModule({
    declarations: [
        ItemsComponent,
        ItemComponent,
    ],
    imports: [
        RouterModule.forChild(ItemsRoutes),
        SharedModule,
        MatIconModule,
        MatMenuModule
    ],
    exports: [RouterModule,]
})


export class ItemsModule {

}