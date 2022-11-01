import { NgModule } from "@angular/core";
import { AssetCardModule } from "./asset-card/asset-card.module";
import { GameCardModule } from "./game-card/game-card.module";


@NgModule ({
    imports: [
        GameCardModule,
        AssetCardModule
    ],
    exports: [
        GameCardModule,
        AssetCardModule
    ]
})

export class CardsModule {

}