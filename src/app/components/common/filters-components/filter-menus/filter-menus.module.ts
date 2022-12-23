import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { AssetsMenusModule } from "./assets-menus/assets-menus.module";
import { FilterMenusComponent } from "./filter-menus.component";
import { GamesMenusComponent } from "./games-menus/games-menus.component";
import { GamesMenusModule } from "./games-menus/games-menus.module";

@NgModule({
    declarations: [
        FilterMenusComponent
    ],
    imports: [
        SharedModule,
        GamesMenusModule,
        AssetsMenusModule

    ],
    exports: [
        FilterMenusComponent
    ]
})

export class FilterMenusModule {

}