import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ChangeSrcDirective } from "@app/shared/directives/change-img-src.directive";
import { SharedModule } from "@app/shared/shared.module";
import { AssetCardComponent } from "./asset-card.component";
import { AssetMenuComponent } from "./asset-menu/asset-menu.component";

@NgModule({
    declarations: [
        AssetCardComponent,
        AssetMenuComponent
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