import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";
import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../components/utils/bg-circle/bg-circle.module";
import { TotemButtonModule } from "../../../../components/utils/totem-button/totem-button.module";
import { TotemSpinnerModule } from "../../../../shared/totem-spinner/totem-spinner.module";
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