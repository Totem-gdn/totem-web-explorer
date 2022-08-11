import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardModule } from "../../cards/item-card/item-card.module";
import { ItemListComponent } from "./item-list.component";



@NgModule({
    declarations: [
        ItemListComponent,
    ],
    imports: [
        SharedModule,
        ItemCardModule,
    ],
    exports: [
        ItemListComponent
    ]
}) 

export class ItemListModule {
    
}