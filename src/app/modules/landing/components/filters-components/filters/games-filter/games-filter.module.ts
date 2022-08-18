import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { GamesFilterComponent } from "./games-filter.component";



@NgModule({
    declarations: [
        GamesFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule,
    ],
    exports: [
        GamesFilterComponent
    ]
})

export class GamesFilterModule {

}