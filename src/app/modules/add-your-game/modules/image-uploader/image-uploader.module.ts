import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ImageUploaderComponent } from "./image-uploader.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ImageCropperModule } from "ngx-image-cropper";
import { TotemSpinnerModule } from "@app/modules/landing/components/common-components/totem-spinner/totem-spinner.module";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";

@NgModule({
    declarations: [
      ImageUploaderComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        ImageCropperModule,
        TotemSpinnerModule,
        MatIconModule,
        MatRippleModule,
        TotemButtonModule
    ],
    exports: [
      ImageUploaderComponent
    ]
})

export class ImageUploaderModule {

}
