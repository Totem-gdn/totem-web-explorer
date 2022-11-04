import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { FilterUpdateComponent } from "./filter-update.component";

@NgModule({
    declarations: [
        FilterUpdateComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        FilterUpdateComponent
    ]
})

export class FilterUpdateModule {

}