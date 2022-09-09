import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { ItemCardComponent } from "./item-card.component";
import { SvgItemsModule } from "./svgs/svg-items.module";



@NgModule({
    declarations: [
        ItemCardComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,

        SvgItemsModule
    ],
    exports: [
        ItemCardComponent
    ]
})

export class ItemCardModule {
    
}