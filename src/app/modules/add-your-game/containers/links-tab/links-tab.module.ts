import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { LinksTabComponent } from "./links-tab.component";

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { FormDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/form-dropdown/form-dropdown.module";
import {MatFormFieldModule} from '@angular/material/form-field';
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";

@NgModule({
    declarations: [
        LinksTabComponent,
    ],
    imports: [
        SharedModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule,
        FormDropdownModule,
        TotemButtonModule,

        ReactiveFormsModule,
        MatFormFieldModule,
    ],
    exports: [
        LinksTabComponent
    ]
})

export class LinksTabModule {

}
