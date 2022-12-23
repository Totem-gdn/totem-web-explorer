import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { DNAFilterMenuModule } from "../menu/dna-filter-menu/dna-filter-menu.module";
import { GameFilterMenuModule } from "../menu/game-filter-menu/game-filter-menu.module";
import { GamesMenusComponent } from "./games-menus.component";

@NgModule({
    declarations: [
        GamesMenusComponent
    ],
    imports: [
        SharedModule,
        DNAFilterMenuModule,
        GameFilterMenuModule
    ],
    exports: [
        GamesMenusComponent
    ]
})

export class GamesMenusModule {
    
}