import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemStartScreenAssetCardComponent } from "./totem-start-screen-asset-card.component";




@NgModule({
    declarations: [
      TotemStartScreenAssetCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
      TotemStartScreenAssetCardComponent
    ]
})

export class TotemStartScreenAssetCardModule {

}
