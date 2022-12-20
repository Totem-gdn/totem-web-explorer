import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { FilterMenuModule } from "../components/filter-menu/filter-menu.module";
import { GamesFilterMenuModule } from "../components/games-filter-menu/games-filter-menu.module";
import { GamesFilterComponent } from "./games-filter.component";



@NgModule({
    declarations: [
        GamesFilterComponent
    ],
    imports: [
        SharedModule,
        FilterMenuModule,
        GamesFilterMenuModule
    ],
    exports: [
        GamesFilterComponent
    ]
})

export class GamesFilterModule {

}