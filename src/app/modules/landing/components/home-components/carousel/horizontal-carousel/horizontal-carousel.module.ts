import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { SwiperModule } from "swiper/angular";
import { ArrowsModule } from "../../../common-components/arrows/arrows.module";
import { AvatarCardModule } from "../../../common-components/cards/avatar-card/avatar-card.module";
import { CardsModule } from "../../../common-components/cards/cards.module";
import { GameCardModule } from "../../../common-components/cards/game-card/game-card.module";
import { ItemCardModule } from "../../../common-components/cards/item-card/item-card.module";
import { SearchDropdownModule } from "../../../common-components/dropdowns/search-dropdown/search-dropdown.module";
import { TotemSpinnerModule } from "../../../common-components/totem-spinner/totem-spinner.module";
import { HorizontalCarouselComponent } from "./horizontal-carousel.component";


@NgModule({
    declarations: [
        HorizontalCarouselComponent
    ],
    imports: [
        SharedModule,
        ArrowsModule,
        MatIconModule,
        CardsModule,
        SearchDropdownModule,
        SwiperModule,
        TotemSpinnerModule
    ],
    exports: [
        HorizontalCarouselComponent
    ]
})

export class HorizontalCarouselModule {

}
