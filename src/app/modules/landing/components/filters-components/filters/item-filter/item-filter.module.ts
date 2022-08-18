import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { ItemFilterComponent } from "./item-filter.component";



@NgModule({
    declarations: [
        ItemFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule,
    ],
    exports: [
        ItemFilterComponent
    ]
})

export class ItemFilterModule {

}