import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
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
    ],
    exports: [
       WidgetDropdownComponent
    ],
    providers: [
    ]
})

export class WidgetDropdownModule {

}
