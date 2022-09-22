import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SearchFieldModule } from "@app/modules/landing/components/common-components/search-field/search-field.module";
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