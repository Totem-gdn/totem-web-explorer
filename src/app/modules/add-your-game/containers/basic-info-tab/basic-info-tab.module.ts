import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { BasicInfoTabComponent } from "./basic-info-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { SearchDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/search-dropdown/search-dropdown.module";
import { FormDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/form-dropdown/form-dropdown.module";

@NgModule({
    declarations: [
        BasicInfoTabComponent,
    ],
    imports: [
        SharedModule,
        ReactiveFormsModule,

        FlexLayoutModule,
        MatIconModule,

        FormDropdownModule,
        MatRippleModule,
        TotemButtonModule,
    ],
    exports: [
        BasicInfoTabComponent
    ]
})

export class BasicInfoTabModule {

}
