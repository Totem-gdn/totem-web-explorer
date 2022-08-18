import { NgModule } from "@angular/core";
import { TotemSearchFilterModule } from "../../common-components/totem-search-filter/totem-search-filter.module";
import { HorizontalCarouselModule } from "./horizontal-carousel/horizontal-carousel.module";

@NgModule({
    imports: [
        HorizontalCarouselModule,
        TotemSearchFilterModule
    ],
    exports: [
        HorizontalCarouselModule,
    ]
})

export class CarouselModule {

}