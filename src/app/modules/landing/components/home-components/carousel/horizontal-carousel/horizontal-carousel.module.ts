import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { ArrowsModule } from "../../../common-components/arrows/arrows.module";
import { AvatarCardModule } from "../../../common-components/cards/avatar-card/avatar-card.module";
import { GameCardModule } from "../../../common-components/cards/game-card/game-card.module";
import { ItemCardModule } from "../../../common-components/cards/item-card/item-card.module";
import { HorizontalCarouselComponent } from "./horizontal-carousel.component";


@NgModule({
    declarations: [
        HorizontalCarouselComponent
    ],
    imports: [
        SharedModule,
        ArrowsModule,
        MatIconModule,
        ItemCardModule,
        GameCardModule,
        AvatarCardModule
    ],
    exports: [
        HorizontalCarouselComponent
    ]
})

export class HorizontalCarouselModule {

}