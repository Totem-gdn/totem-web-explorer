import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AvatarCardModule } from "@app/modules/landing/components/common-components/cards/avatar-card/avatar-card.module";
import { GameCardModule } from "@app/modules/landing/components/common-components/cards/game-card/game-card.module";
import { ItemCardModule } from "@app/modules/landing/components/common-components/cards/item-card/item-card.module";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { BuyComponent } from "./buy.component";
import { BuyRoutes } from "./buy.routing";


@NgModule({
    declarations: [
        BuyComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(BuyRoutes),
        ItemCardModule,
        GameCardModule,
        AvatarCardModule,
        TotemButtonModule
    ],
    exports: [
        BuyComponent
    ]
})

export class BuyModule {

}