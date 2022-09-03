import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ItemLegacyComponent } from "./item-legacy.component";


@NgModule({
    declarations: [
        ItemLegacyComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ItemLegacyComponent
    ]
})

export class ItemLegacyModule {
    
}