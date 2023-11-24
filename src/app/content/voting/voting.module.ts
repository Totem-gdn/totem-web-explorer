import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TotemSpinnerModule } from "../../shared/totem-spinner/totem-spinner.module";
import { TotemCropperModule } from "@app/modules/specific/add-your-game/modules/totem-cropper/totem-cropper.module";
import { VotingComponent } from "./voting.component";
import { VotingRoutes } from "./voting.routing";
import { TotemPaginationModule } from "@app/modules/profile/components/common/totem-pagination/totem-pagination.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatRippleModule } from "@angular/material/core";


@NgModule({
    declarations: [
      VotingComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(VotingRoutes),
        TotemSpinnerModule,
        TotemCropperModule,
        TotemPaginationModule,
        MatButtonModule,
        MatIconModule,
        ClipboardModule,
        MatRippleModule,
    ],
    exports: [
      VotingComponent
    ]
})

export class VotingModule {

}
