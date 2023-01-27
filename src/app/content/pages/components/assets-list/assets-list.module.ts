import { NgModule } from "@angular/core";
import { TotemAssetCardModule } from "@app/modules/totem-asset-card/totem-asset-card.module";
import { SharedModule } from "@app/shared/shared.module";
import { SortByModule } from "../sort-by/sort-by.module";
import { AssetsListComponent } from "./assets-list.component";

@NgModule({
    declarations: [
        AssetsListComponent
    ],
    imports: [
        SharedModule,
        SortByModule,

        TotemAssetCardModule
    ],
    exports: [
        AssetsListComponent
    ]
})

export class AssetsListModule {

}