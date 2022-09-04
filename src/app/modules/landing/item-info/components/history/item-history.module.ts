import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ItemHistoryComponent } from "./item-history.component";


@NgModule({
    declarations: [
        ItemHistoryComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        ItemHistoryComponent
    ]
})

export class ItemHistoryModule {

}