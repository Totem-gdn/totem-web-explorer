import { NgModule } from "@angular/core";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { ItemDescComponent } from "./item-desc.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GameDropdownModule } from "@app/components/common/dropdowns/game-dropdown/game-dropdown.module";
import { SharedButtomModule } from "@app/components/utils/share-button/share-button.module";



@NgModule({
    declarations: [
        ItemDescComponent
    ],
    imports: [
        SharedModule,
        TotemButtonModule,
        ClipboardModule,
        FlexLayoutModule,
        GameDropdownModule,

        SharedButtomModule
    ],
    exports: [
        ItemDescComponent
    ]
})

export class ItemDescModule {

}
