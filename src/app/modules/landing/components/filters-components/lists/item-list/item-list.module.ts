import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardModule } from "../../../common-components/cards/item-card/item-card.module";
import { SearchDropdownModule } from "../../../common-components/search-dropdown/search-dropdown.module";
import { FilterNavModule } from "../../filters/components/filter-nav/filter-nav.module";
import { ItemListComponent } from "./item-list.component";



@NgModule({
    declarations: [
        ItemListComponent,
    ],
    imports: [
        SharedModule,
        ItemCardModule,
        FilterNavModule,
        SearchDropdownModule
    ],
    exports: [
        ItemListComponent
    ]
}) 

export class ItemListModule {
    
}