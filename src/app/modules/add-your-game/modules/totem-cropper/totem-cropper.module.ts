import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TotemCropperComponent } from "./totem-cropper.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ImageCropperModule } from "ngx-image-cropper";
import { TotemSpinnerModule } from "@app/modules/landing/components/common-components/totem-spinner/totem-spinner.module";

@NgModule({
    declarations: [
      TotemCropperComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        ImageCropperModule,
        TotemSpinnerModule
    ],
    exports: [
      TotemCropperComponent
    ]
})

export class TotemCropperModule {

}
