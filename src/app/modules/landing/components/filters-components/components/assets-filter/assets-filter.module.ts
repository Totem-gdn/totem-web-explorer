import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { AssetsFilterComponent } from "./assets-filter.component";

@NgModule({
    declarations: [
        AssetsFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule
    ],
    exports: [
        AssetsFilterComponent
    ]
})

export class AssetsFilterModule {
    
}