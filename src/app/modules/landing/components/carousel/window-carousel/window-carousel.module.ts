import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { ArrowsModule } from "../../arrows/arrows.module";
import { WindowCarouselComponent } from "./window-carousel.component";


@NgModule({
    declarations: [
        WindowCarouselComponent
    ],
    imports: [
        SharedModule,
        ArrowsModule
    ],
    exports: [
        WindowCarouselComponent
    ]
})

export class WindowCarouselModule {

}