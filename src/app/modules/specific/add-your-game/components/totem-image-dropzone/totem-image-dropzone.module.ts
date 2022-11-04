import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TotemImageDropzoneComponent } from "./totem-image-dropzone.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        TotemImageDropzoneComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule
    ],
    exports: [
        TotemImageDropzoneComponent
    ]
})

export class TotemImageDropzoneModule {

}
