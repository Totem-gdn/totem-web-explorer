import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { FilterComponentsModule } from "../components/filters-components/filter-components.module";
import { ItemsComponent } from "./items.component";
import { ItemsRoutes } from "./items.routing";




@NgModule({
    declarations: [
        ItemsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ItemsRoutes),

        FilterComponentsModule,
    ],
    exports: [
        ItemsComponent
    ]
})

export class ItemsModule {

}