import { NgModule } from "@angular/core";
import { SearchFieldModule } from "@app/components/utils/search-field/search-field.module";
import { SharedModule } from "@app/shared/shared.module";
import { DropdownSkeletonComponent } from "./dropdown-skeleton.component";


@NgModule({
    declarations: [
        DropdownSkeletonComponent
    ],
    imports: [
        SharedModule,
        SearchFieldModule
    ],
    exports: [
        DropdownSkeletonComponent
    ]
})

export class DropdownSkeletonModule {

}