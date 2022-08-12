import { NgModule } from "@angular/core";
import { TotemSearchFilterModule } from "../../common-components/totem-search-filter/totem-search-filter.module";
import { HorizontalCarouselModule } from "./horizontal-carousel/horizontal-carousel.module";
import { WindowCarouselModule } from "./window-carousel/window-carousel.module";

@NgModule({
    imports: [
        HorizontalCarouselModule,
        WindowCarouselModule,
        TotemSearchFilterModule
    ],
    exports: [
        HorizontalCarouselModule,
        WindowCarouselModule
    ]
})

export class CarouselModule {

}