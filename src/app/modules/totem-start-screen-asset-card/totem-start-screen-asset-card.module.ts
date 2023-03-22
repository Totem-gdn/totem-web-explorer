import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { TotemStartScreenAssetCardComponent } from "./totem-start-screen-asset-card.component";




@NgModule({
    declarations: [
      TotemStartScreenAssetCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        RouterModule
    ],
    exports: [
      TotemStartScreenAssetCardComponent
    ]
})

export class TotemStartScreenAssetCardModule {

}
