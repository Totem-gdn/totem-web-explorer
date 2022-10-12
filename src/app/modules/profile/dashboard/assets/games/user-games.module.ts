import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterComponentsModule } from "@app/modules/landing/components/filters-components/filter-components.module";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileStatsModule } from "../../../components/profile-stats/profile-stats.module";
import { UserGamesComponent } from "./user-games.component";
import { UserGamesRoutes } from "./user-games.routing";


@NgModule({
    declarations: [
        UserGamesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserGamesRoutes),

        FilterComponentsModule,
        ProfileStatsModule
    ],
    exports: [
        UserGamesComponent
    ]
})

export class UserGamesModule {

}
