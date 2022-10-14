import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../components/common-components/bg-circle/bg-circle.module";
import { TotemButtonModule } from "../../components/common-components/totem-button/totem-button.module";
import { CarouselModule } from "../../components/home-components/carousel/carousel.module";
import { GameDescriptionComponent } from "./description/game-description.component";
import { GameInfoComponent } from "./game-info.component";
import { GameInfoRoutes } from "./game-info.routing";
import { GameReviewComponent } from "./review/game-review.component";


@NgModule({
    declarations: [
        GameInfoComponent,
        GameDescriptionComponent,
        GameReviewComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(GameInfoRoutes),

        MatIconModule,
        TotemButtonModule,
        CarouselModule,
        BackgroundCircleModule
    ],
    exports: [
        GameInfoComponent
    ]
})

export class GameInfoModule {

}