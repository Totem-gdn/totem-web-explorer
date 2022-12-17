import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { DropdownSkeletonComponent } from "../dropdown-skeleton/dropdown-skeleton.component";
import { DropdownSkeletonModule } from "../dropdown-skeleton/dropdown-skeleton.module";
import { WidgetDropdownComponent } from "./widget-dropdown.component";


@NgModule({
    declarations: [
        WidgetDropdownComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule,
        FormsModule,
        SearchFieldModule,
        DropdownSkeletonModule
    ],
    exports: [
       WidgetDropdownComponent
    ],
    providers: [
    ]
})

export class WidgetDropdownModule {

}
