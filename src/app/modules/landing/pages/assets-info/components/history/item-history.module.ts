import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { SharedModule } from "@app/shared/shared.module";
import { ItemHistoryComponent } from "./item-history.component";


@NgModule({
    declarations: [
        ItemHistoryComponent
    ],
    imports: [
        SharedModule,
        ClipboardModule,
        FlexLayoutModule
    ],
    exports: [
        ItemHistoryComponent
    ]
})

export class ItemHistoryModule {

}