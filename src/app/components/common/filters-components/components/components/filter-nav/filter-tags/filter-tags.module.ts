import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { FilterTagsComponent } from "./filter-tags.component";


@NgModule({
    declarations: [
        FilterTagsComponent,
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        FilterTagsComponent
    ]
})

export class FilterTagsModule {
    
}