import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TotemCropperComponent } from "./totem-cropper.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ImageCropperModule } from "ngx-image-cropper";
import { TotemSpinnerModule } from "@app/shared/totem-spinner/totem-spinner.module";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { MatRippleModule } from "@angular/material/core";

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
        MatRippleModule,
        ImageCropperModule,
        TotemSpinnerModule,
        TotemButtonModule,
        ReactiveFormsModule
    ],
    exports: [
      TotemCropperComponent
    ]
})

export class TotemCropperModule {

}
