import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ItemSpear } from "./icons/spear/spear.component";
import { ItemSword } from "./icons/sword/sword.component";
import { ItemCardComponent } from "./item-card.component";



@NgModule({
    declarations: [
        ItemCardComponent,
        ItemSword,
        ItemSpear
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ItemCardComponent,
        ItemSword,
        ItemSpear
    ]

})

export class ItemCardModule {

}