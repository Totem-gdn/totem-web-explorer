import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "app/shared/shared.module";
import { ArrowsModule } from "../../../common-components/arrows/arrows.module";
import { WindowCarouselComponent } from "./window-carousel.component";


@NgModule({
    declarations: [
        WindowCarouselComponent
    ],
    imports: [
        SharedModule,
        ArrowsModule,
        MatIconModule
    ],
    exports: [
        WindowCarouselComponent
    ]
})

export class WindowCarouselModule {

}