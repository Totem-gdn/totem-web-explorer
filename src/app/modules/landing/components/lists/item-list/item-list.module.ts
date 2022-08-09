import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ItemListComponent } from "./item-list.component";



@NgModule({
    declarations: [
        ItemListComponent,
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        ItemListComponent
    ]
}) 

export class ItemListModule {
    
}