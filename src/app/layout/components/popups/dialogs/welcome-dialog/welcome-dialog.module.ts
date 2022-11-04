import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { WelcomeDialogComponent } from "./welcome-dialog.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ImageCropperModule } from "ngx-image-cropper";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";

@NgModule({
    declarations: [
      WelcomeDialogComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatRippleModule,
        ImageCropperModule,
        MatIconModule,
        MatRippleModule,
        TotemButtonModule
    ],
    exports: [
      WelcomeDialogComponent
    ]
})

export class WelcomeDialogModule {

}
