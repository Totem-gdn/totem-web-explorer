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
import { DescriptionFormComponent } from "./description-form/description-form.component";
import { ContactFormComponent } from "./contact-form/contact-form.component";

@NgModule({
    declarations: [
        BasicInfoComponent,
        GeneralDescription,
        GameDetailsComponent,
        DescriptionFormComponent,
        ContactFormComponent
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,
        MatIconModule,

        FormDropdownModule,
        MatRippleModule,
        TotemButtonModule,
    ],
    exports: [
        BasicInfoComponent
    ]
})

export class BasicInfoModule {

}
