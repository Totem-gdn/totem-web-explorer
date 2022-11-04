import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { DetailsTabComponent } from "./details-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { TotemImageDropzoneModule } from "../../components/totem-image-dropzone/totem-image-dropzone.module";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TotemCropperModule } from "../../modules/totem-cropper/totem-cropper.module";
import { PreviewCardComponent } from "./components/preview-card/preview-card.component";
import { PreviewSearchCardComponent } from "./components/preview-search-card/preview-search-card.component";
import { GalleryCardComponent } from "./components/gallery-card/gallery-card.component";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";

@NgModule({
    declarations: [
        DetailsTabComponent,
        PreviewCardComponent,
        PreviewSearchCardComponent,
        GalleryCardComponent
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule,
        TotemImageDropzoneModule,
        MatDialogModule,
        MatIconModule,
        TotemCropperModule,
        TotemButtonModule
    ],
    exports: [
        DetailsTabComponent,
        PreviewCardComponent,
        PreviewSearchCardComponent,
        GalleryCardComponent
    ]
})

export class DetailsTabModule {

}
