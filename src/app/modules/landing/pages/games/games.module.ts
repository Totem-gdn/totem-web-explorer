import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { FilterComponentsModule } from "../../components/filters-components/filter-components.module";
import { GamesComponent } from "./games.component";
import { GamesRoutes } from "./games.routing";



@NgModule({
    declarations: [
        GamesComponent
    ],
    imports: [
        RouterModule.forChild(GamesRoutes),
        SharedModule,

        FilterComponentsModule
    ],
    exports: [
        GamesComponent
    ]
})

export class GamesModule {

}