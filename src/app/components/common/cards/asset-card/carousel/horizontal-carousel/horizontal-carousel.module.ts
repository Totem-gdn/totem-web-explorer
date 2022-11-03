import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { SwiperModule } from "swiper/angular";
import { ArrowsModule } from "../../../../../utils/arrows/arrows.module";
import { CardsModule } from "../../../cards.module";
import { GameDropdownModule } from "../../../../dropdowns/game-dropdown/game-dropdown.module";
import { SearchDropdownModule } from "../../../../dropdowns/search-dropdown/search-dropdown.module";
import { TotemSpinnerModule } from "../../../../../../shared/totem-spinner/totem-spinner.module";
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
        GameDropdownModule,
        
        SwiperModule,
        TotemSpinnerModule
    ],
    exports: [
        HorizontalCarouselComponent
    ]
})

export class HorizontalCarouselModule {

}
