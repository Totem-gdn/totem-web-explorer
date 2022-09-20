import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AddYourGameComponent } from "./add-your-game.component";
import { AddYourGameRoutes } from "./add-your-game.routing";

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { GameSubmissionNavModule } from "./components/game-submission-nav/game-submission-nav.module";

@NgModule({
    declarations: [
      AddYourGameComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(AddYourGameRoutes),
        FlexLayoutModule,
        MatProgressBarModule,

        GameSubmissionNavModule
    ],
    exports: [
      AddYourGameComponent
    ]
})

export class AddYourGameModule {

}
