import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ItemHistoryComponent } from "./item-history.component";


@NgModule({
    declarations: [
        ItemHistoryComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ItemHistoryComponent
    ]
})

export class ItemHistoryModule {

}