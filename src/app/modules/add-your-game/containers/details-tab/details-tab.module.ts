import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { DetailsTabComponent } from "./details-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { TotemImageDropzoneModule } from "../../components/totem-image-dropzone/totem-image-dropzone.module";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { TotemCropperModule } from "../../modules/totem-cropper/totem-cropper.module";

@NgModule({
    declarations: [
        DetailsTabComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule,
        TotemImageDropzoneModule,
        MatDialogModule,
        TotemCropperModule
    ],
    exports: [
        DetailsTabComponent
    ]
})

export class DetailsTabModule {

}
