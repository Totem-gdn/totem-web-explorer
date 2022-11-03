import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { AssetCardComponent } from "./asset-card.component";

@NgModule({
    declarations: [
        AssetCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
        AssetCardComponent
    ]
})

export class AssetCardModule {

}