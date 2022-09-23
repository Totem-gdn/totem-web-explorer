import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AddYourGameComponent } from "./add-your-game.component";
import { AddYourGameRoutes } from "./add-your-game.routing";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { GameSubmissionNavModule } from "./components/game-submission-nav/game-submission-nav.module";
import { DetailsTabModule } from "./containers/details-tab/details-tab.module";
import { LinksTabModule } from "./containers/links-tab/links-tab.module";
import { BasicInfoModule } from "./containers/basic-info-tab/basic-info.module";

@NgModule({
    declarations: [
      AddYourGameComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(AddYourGameRoutes),
        FlexLayoutModule,
        MatProgressBarModule,

        GameSubmissionNavModule,

        DetailsTabModule,
        LinksTabModule,
        BasicInfoModule
    ],
    exports: [
      AddYourGameComponent
    ]
})

export class AddYourGameModule {

}
