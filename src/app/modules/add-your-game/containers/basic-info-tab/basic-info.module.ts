import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { BasicInfoComponent } from "./basic-info.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { FormDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/form-dropdown/form-dropdown.module";
import { GeneralDescription } from "./general-description/general-description.component";
import { GameDetailsComponent } from "./game-details/game-details.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";
import { TotemImageDropzoneModule } from "../../components/totem-image-dropzone/totem-image-dropzone.module";

@NgModule({
    declarations: [
        BasicInfoComponent,
        GeneralDescription,
        GameDetailsComponent,
        ContactFormComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MatIconModule,

        FormDropdownModule,
        MatRippleModule,
        TotemButtonModule,
        TotemImageDropzoneModule,

        FlexLayoutModule
    ],
    exports: [
        BasicInfoComponent
    ]
})

export class BasicInfoModule {

}
