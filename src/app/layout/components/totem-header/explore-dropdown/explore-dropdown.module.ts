import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ExploreDropdownComponent } from "./explore-dropdown.component";

@NgModule({
    declarations: [
        ExploreDropdownComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ExploreDropdownComponent
    ]
})

export class ExploreDropdownModule {
    
}