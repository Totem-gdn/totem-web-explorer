import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ItemCardModule } from "../components/common-components/cards/item-card/item-card.module";
import { ItemHistoryModule } from "./components/history/item-history.module";
import { ItemDescModule } from "./components/item-desc/item-desc.module";
import { ItemLegacyModule } from "./components/legacy/item-legacy.module";
import { ItemPropertiesModule } from "./components/properties/item-properties.module";
import { ItemInfoComponent } from "./item-info.component";
import { ItemInfoRoutes } from "./item-info.routing";


@NgModule({
    declarations: [
        ItemInfoComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
        RouterModule.forChild(ItemInfoRoutes),

        ItemDescModule,
        ItemCardModule,
        ItemLegacyModule,
        ItemHistoryModule,
        ItemPropertiesModule
    ],
    exports: [
        ItemInfoComponent
    ]
})

export class ItemInfoMadule {

}