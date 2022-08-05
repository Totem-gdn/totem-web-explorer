import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { GameDescComponent } from "./game-desc.component";




@NgModule({
    declarations: [
        GameDescComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        GameDescComponent
    ]
})

export class GameDescModule {
    
}