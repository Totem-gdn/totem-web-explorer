import { NgModule } from "@angular/core";
import { TotemSearchFilterModule } from "../totem-search-filter/totem-search-filter.module";
import { HorizontalCarouselModule } from "./horizontal-carousel/horizontal-carousel.module";
import { PortfolioCarouselModule } from "./portfolio-carousel/portfolio-carousel.module";

@NgModule({
    imports: [
        HorizontalCarouselModule,
        PortfolioCarouselModule,
        TotemSearchFilterModule
    ],
    exports: [
        HorizontalCarouselModule,
        PortfolioCarouselModule,
    ]
})

export class CarouselModule {

}