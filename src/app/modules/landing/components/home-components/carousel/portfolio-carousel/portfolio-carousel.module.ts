import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { PortfolioCarouselComponent } from "./portfolio-carousel.component";


@NgModule({
    declarations: [
        PortfolioCarouselComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        PortfolioCarouselComponent
    ]
})

export class PortfolioCarouselModule {
    
}