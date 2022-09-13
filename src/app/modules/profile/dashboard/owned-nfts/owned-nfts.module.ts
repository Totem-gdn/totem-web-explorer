import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AvatarCardModule } from "@app/modules/landing/components/common-components/cards/avatar-card/avatar-card.module";
import { GameCardModule } from "@app/modules/landing/components/common-components/cards/game-card/game-card.module";
import { ItemCardModule } from "@app/modules/landing/components/common-components/cards/item-card/item-card.module";
import { SharedModule } from "@app/shared/shared.module";
import { OwnedNftsComponent } from "./owned-nfts.component";
import { OwnedNftsRoutes } from "./owned-nfts.routing";


@NgModule({
    declarations: [
        OwnedNftsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(OwnedNftsRoutes),

        ItemCardModule,
        AvatarCardModule,
        GameCardModule
    ],
    exports: [
        OwnedNftsComponent
    ]
})

export class OwnedNftsModule {
    
}