import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ItemLegacyComponent } from "./item-legacy.component";


@NgModule({
    declarations: [
        ItemLegacyComponent
    ],
    imports: [
        SharedModule,
        ClipboardModule
    ],
    exports: [
        ItemLegacyComponent
    ]
})

export class ItemLegacyModule {
    
}