import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { SelectedAssetCardComponent } from "./totem-selected-asset-card.component";




@NgModule({
    declarations: [
      SelectedAssetCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
      SelectedAssetCardComponent
    ]
})

export class SelectedAssetCardModule {

}
