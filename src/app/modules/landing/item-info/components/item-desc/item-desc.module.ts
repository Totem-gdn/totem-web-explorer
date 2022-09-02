import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { ItemDescComponent } from "./item-desc.component";


@NgModule({
    declarations: [
        ItemDescComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,

        TotemButtonModule,
    ],
    exports: [
        ItemDescComponent
    ]
})

export class ItemDescModule {

}