import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { GameFilterMenuComponent } from "./game-filter-menu.component";


@NgModule({
    declarations: [
        GameFilterMenuComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        GameFilterMenuComponent
    ]
})

export class GameFilterMenuModule {
    
}