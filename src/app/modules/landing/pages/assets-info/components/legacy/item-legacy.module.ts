import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ItemLegacyComponent } from "./item-legacy.component";


@NgModule({
    declarations: [
        ItemLegacyComponent
    ],
    imports: [
        SharedModule,
        ClipboardModule,
        MatIconModule,
    ],
    exports: [
        ItemLegacyComponent
    ]
})

export class ItemLegacyModule {
    
}