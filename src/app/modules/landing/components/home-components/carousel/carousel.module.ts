import { NgModule } from "@angular/core";
import { HorizontalCarouselModule } from "./horizontal-carousel/horizontal-carousel.module";
import { WindowCarouselModule } from "./window-carousel/window-carousel.module";

@NgModule({
    imports: [
        HorizontalCarouselModule,
        WindowCarouselModule
    ],
    exports: [
        HorizontalCarouselModule,
        WindowCarouselModule
    ]
})

export class CarouselModule {

}