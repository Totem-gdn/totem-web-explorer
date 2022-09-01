import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GamesModule } from "@app/modules/landing/games/games.module";
import { SharedModule } from "@app/shared/shared.module";
import { UserGamesComponent } from "./user-games.component";
import { UserGamesRoutes } from "./user-games.routing";


@NgModule({
    declarations: [
        UserGamesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserGamesRoutes),

        GamesModule
    ],
    exports: [
        UserGamesComponent
    ]
})

export class UserGamesModule {

}