import { NgModule } from "@angular/core";
import { AssetCardModule } from "./asset-card/asset-card.module";
import { AvatarCardModule } from "./avatar-card/avatar-card.module";
import { GameCardModule } from "./game-card/game-card.module";
import { GemCardModule } from "./gem-card/gem-card.module";
import { ItemCardModule } from "./item-card/item-card.module";


@NgModule ({
    imports: [
        ItemCardModule,
        AvatarCardModule,
        GameCardModule,
        GemCardModule,
        AssetCardModule
    ],
    exports: [
        ItemCardModule,
        AvatarCardModule,
        GameCardModule,
        GemCardModule,
        AssetCardModule
    ]
})

export class CardsModule {

}