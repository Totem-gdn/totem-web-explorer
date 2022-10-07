import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TotemButtonModule } from "../components/common-components/totem-button/totem-button.module";
import { GameDescriptionComponent } from "./description/game-description.component";
import { GameInfoComponent } from "./game-info.component";
import { GameInfoRoutes } from "./game-info.routing";


@NgModule({
    declarations: [
        GameInfoComponent,
        GameDescriptionComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(GameInfoRoutes),

        MatIconModule,
        TotemButtonModule,
    ],
    exports: [
        GameInfoComponent
    ]
})

export class GameInfoModule {

}