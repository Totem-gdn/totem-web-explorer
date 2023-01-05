import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { TotemPaginationModule } from "@app/modules/profile/components/common/totem-pagination/totem-pagination.module";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { ItemLegacyComponent } from "./item-legacy.component";
import { TooltipPopupModule } from "@app/components/utils/tooltip-popup/tooltip-popup.module";


@NgModule({
    declarations: [
        ItemLegacyComponent
    ],
    imports: [
        SharedModule,
        ClipboardModule,
        TotemPaginationModule,
        MatIconModule,
        TooltipPopupModule
    ],
    exports: [
        ItemLegacyComponent
    ]
})

export class ItemLegacyModule {

}
