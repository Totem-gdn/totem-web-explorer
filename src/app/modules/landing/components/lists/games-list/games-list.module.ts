import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { GameCardModule } from "../../game-card/game-card.module";
import { GamesListComponent } from "./games-list.component";



@NgModule({
    declarations: [
        GamesListComponent,
    ],
    imports: [
        SharedModule,
        GameCardModule,
    ],
    exports: [
        GamesListComponent
    ]
}) 

export class GamesListModule {
    
}