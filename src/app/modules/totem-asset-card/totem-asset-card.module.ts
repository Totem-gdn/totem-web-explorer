import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { TotemAssetCardComponent } from "./totem-asset-card.component";




@NgModule({
    declarations: [
      TotemAssetCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
      TotemAssetCardComponent
    ]
})

export class TotemAssetCardModule {

}
