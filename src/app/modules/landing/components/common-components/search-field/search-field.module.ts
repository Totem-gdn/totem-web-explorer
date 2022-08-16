import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { SearchFieldComponent } from "./search-field.component";


@NgModule({
    declarations: [
        SearchFieldComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        SearchFieldComponent
    ]
})

export class SearchFieldModule {
    
}