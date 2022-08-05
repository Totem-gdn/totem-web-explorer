import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { GameCardComponent } from "./game-card.component";




@NgModule({
    declarations: [
        GameCardComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
    ],
    exports: [
        GameCardComponent
    ]
})

export class GameCardModule {
    
}