import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { PortfolioCarouselComponent } from "./portfolio-carousel.component";


@NgModule({
    declarations: [
        PortfolioCarouselComponent
    ],
    imports: [
        SharedModule,
        MatIconModule
    ],
    exports: [
        PortfolioCarouselComponent
    ]
})

export class PortfolioCarouselModule {
    
}