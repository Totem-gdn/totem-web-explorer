import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { TotemAssetCardComponent } from "./totem-asset-card.component";




@NgModule({
    declarations: [
      TotemAssetCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        RouterModule
    ],
    exports: [
      TotemAssetCardComponent
    ]
})

export class TotemAssetCardModule {

}
