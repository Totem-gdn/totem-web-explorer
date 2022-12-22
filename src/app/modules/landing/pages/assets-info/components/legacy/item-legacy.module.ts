import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { TotemPaginationModule } from "@app/modules/profile/components/common/totem-pagination/totem-pagination.module";
import { SharedModule } from "@app/shared/shared.module";
import { ItemLegacyComponent } from "./item-legacy.component";


@NgModule({
    declarations: [
        ItemLegacyComponent
    ],
    imports: [
        SharedModule,
        ClipboardModule,
        TotemPaginationModule
    ],
    exports: [
        ItemLegacyComponent
    ]
})

export class ItemLegacyModule {

}
