import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SearchFieldComponent } from "./search-field.component";


@NgModule({
    declarations: [
        SearchFieldComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        ReactiveFormsModule
    ],
    exports: [
        SearchFieldComponent
    ]
})

export class SearchFieldModule {

}
