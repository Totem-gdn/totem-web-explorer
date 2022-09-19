import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { GemFilterComponent } from "./gem-filter.component";



@NgModule({
    declarations: [
        GemFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule,
    ],
    exports: [
        GemFilterComponent
    ]
})

export class GemFilterModule {

}