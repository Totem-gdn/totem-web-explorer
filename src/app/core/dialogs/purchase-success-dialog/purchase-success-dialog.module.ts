import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { PurchaseSuccessDialogComponent } from "./purchase-success-dialog.component";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import {MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from "@angular/material/button";
import { ImageCropperModule } from "ngx-image-cropper";
import { MatIconModule } from "@angular/material/icon";
import { MatRippleModule } from "@angular/material/core";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { TotemSpinnerModule } from "@app/shared/totem-spinner/totem-spinner.module";
import { BackgroundCircleModule } from "@app/components/utils/bg-circle/bg-circle.module";

@NgModule({
    declarations: [
      PurchaseSuccessDialogComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatProgressBarModule,
        MatDialogModule,
        MatButtonModule,
        MatRippleModule,
        ImageCropperModule,
        TotemSpinnerModule,
        MatIconModule,
        MatRippleModule,
        TotemButtonModule,
        BackgroundCircleModule,
    ],
    exports: [
      PurchaseSuccessDialogComponent
    ]
})

export class PurchaseSuccessDialogModule {

}
