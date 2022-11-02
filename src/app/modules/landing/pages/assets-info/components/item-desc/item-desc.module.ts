import { NgModule } from "@angular/core";
import { SearchDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/search-dropdown/search-dropdown.module";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { ItemDescComponent } from "./item-desc.component";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { FlexLayoutModule } from "@angular/flex-layout";
import { GameDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/game-dropdown/game-dropdown.module";



@NgModule({
    declarations: [
        ItemDescComponent
    ],
    imports: [
        SharedModule,
        
        TotemButtonModule,
        SearchDropdownModule,
        ClipboardModule,
        FlexLayoutModule,
        GameDropdownModule
    ],
    exports: [
        ItemDescComponent
    ]
})

export class ItemDescModule {

}