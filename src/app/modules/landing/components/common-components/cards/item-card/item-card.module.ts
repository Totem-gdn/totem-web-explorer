import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardComponent } from "./item-card.component";



@NgModule({
    declarations: [
        ItemCardComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
        ItemCardComponent
    ]
})

export class ItemCardModule {
    
}