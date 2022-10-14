import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetInfoModule } from "../asset-info.module";
import { ItemInfoComponent } from "./item-info.component";
import { ItemInfoRoutes } from "./item-info.routing";

@NgModule({
    declarations: [
        ItemInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ItemInfoRoutes),
        AssetInfoModule
    ],
    exports: [
        ItemInfoComponent
    ]
})

export class ItemInfoModule {

}