import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";

import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { TotemLegacyCardModule } from "@app/modules/totem-legacy-card/totem-legacy-card.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetLegacyItemModule } from "./asset-legacy-item/asset-legacy-item.module";
import { AssetLegacyTableComponent } from "./asset-legacy-table.component";

@NgModule({
    declarations: [
      AssetLegacyTableComponent
    ],
    imports: [
      SharedModule,
      CarouselModule,
      FlexLayoutModule,
      NotFoundModule,
      AssetLegacyItemModule,
      MatIconModule,
      ClipboardModule,
    ],
    exports: [
      AssetLegacyTableComponent
    ]
})

export class AssetLegacyTableModule {

}
