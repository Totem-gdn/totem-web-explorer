import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NotFoundModule } from "@app/modules/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../components/common-components/bg-circle/bg-circle.module";
import { TotemButtonModule } from "../../components/common-components/totem-button/totem-button.module";
import { TotemSpinnerModule } from "../../components/common-components/totem-spinner/totem-spinner.module";
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

        TotemButtonModule,
        CarouselModule,
        BackgroundCircleModule,
        NotFoundModule,
        TotemSpinnerModule
    ],
    exports: [
        GameInfoComponent
    ]
})

export class GameInfoModule {

}