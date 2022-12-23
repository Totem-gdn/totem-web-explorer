import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { GamesMenusComponent } from "./games-menus.component";

@NgModule({
    declarations: [
        GamesMenusComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        GamesMenusComponent
    ]
})

export class GamesMenusModule {
    
}