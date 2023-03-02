import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TotemSpinnerModule } from "../../shared/totem-spinner/totem-spinner.module";
import { TotemCropperModule } from "@app/modules/specific/add-your-game/modules/totem-cropper/totem-cropper.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutes } from "./profile.routing";
import { ProfileMessagesComponent } from "./containers/profile-messages/profile-messages.component";
import { ProfileInformationComponent } from "./containers/profile-information/profile-information.component";
import { TotemPaginationModule } from "@app/modules/profile/components/common/totem-pagination/totem-pagination.module";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ClipboardModule } from "@angular/cdk/clipboard";
import { MatRippleModule } from "@angular/material/core";
import { ProfileInformationModule } from "./containers/profile-information/profile.information.module";


@NgModule({
    declarations: [
        ProfileComponent,
        ProfileMessagesComponent,
        // ProfileInformationComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ProfileRoutes),
        TotemSpinnerModule,
        TotemCropperModule,
        TotemPaginationModule,
        MatButtonModule,
        MatIconModule,
        ClipboardModule,
        MatRippleModule,

        ProfileInformationModule
    ],
    exports: [
        ProfileComponent
    ]
})

export class ProfileModule {

}
