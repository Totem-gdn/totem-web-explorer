import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { ClickOutsideDirective } from "@app/shared/directives/click-outside.directive";
import { SharedModule } from "@app/shared/shared.module";
import { SearchDropdownComponent } from "./search-dropdown.component";


@NgModule({
    declarations: [
        SearchDropdownComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
        FormsModule,
        SearchFieldModule,
    ],
    exports: [
        SearchDropdownComponent
    ],
    providers: [
    ]
})

export class SearchDropdownModule {

}
