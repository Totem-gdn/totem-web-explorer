import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TotemCropperComponent } from "./totem-cropper.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ImageCropperModule } from "ngx-image-cropper";
import { TotemSpinnerModule } from "@app/modules/landing/components/common-components/totem-spinner/totem-spinner.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
      TotemCropperComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        ImageCropperModule,
        TotemSpinnerModule,
        ReactiveFormsModule
    ],
    exports: [
      TotemCropperComponent
    ]
})

export class TotemCropperModule {

}
