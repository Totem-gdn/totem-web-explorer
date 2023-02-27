import { ClipboardModule } from "@angular/cdk/clipboard";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { CarouselModule } from "@app/components/common/carousel/carousel.module";
import { ShareButtonModule } from "@app/components/utils/share-button/share-button.module";
import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { GameDescriptionComponent } from "./description/game-description.component";
import { DemoGameInfoComponent } from "./game-info.component";
import { DemoGameInfoRoutes } from "./game-info.routing";
import { GameReviewComponent } from "./review/game-review.component";


@NgModule({
    declarations: [
        DemoGameInfoComponent,
        GameDescriptionComponent,
        GameReviewComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(DemoGameInfoRoutes),

        CarouselModule,
        NotFoundModule,
        ShareButtonModule,
        ClipboardModule,
        MatIconModule
    ],
    exports: [
        DemoGameInfoComponent
    ]
})

export class DemoGameInfoModule {

}