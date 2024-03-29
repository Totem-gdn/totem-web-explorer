import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetLegacyItemComponent } from "./asset-legacy-item.component";

@NgModule({
    declarations: [
      AssetLegacyItemComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        ClipboardModule,
        RouterModule
    ],
    exports: [
      AssetLegacyItemComponent
    ]
})

export class AssetLegacyItemModule {

}
