import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SearchFieldModule } from "../../search-field/search-field.module";
import { FormDropdownComponent } from "./form-dropdown.component";


@NgModule({
    declarations: [
        FormDropdownComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        SearchFieldModule
    ],
    exports: [
        FormDropdownComponent
    ]
})

export class FormDropdownModule {

}