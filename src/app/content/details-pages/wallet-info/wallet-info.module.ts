import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MyAssetsModule } from "@app/content/my-assets/my-assets.module";
import { UserAssetsModule } from "@app/content/my-assets/user-assets/user-assets.module";
import { ProfileInformationComponent } from "@app/content/profile/containers/profile-information/profile-information.component";
import { ProfileInformationModule } from "@app/content/profile/containers/profile-information/profile.information.module";
import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { WalletInfoComponent } from "./wallet-info.component";
import { WalletInfoRoutes } from "./wallet-info.routing";

@NgModule({
    declarations: [
        WalletInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(WalletInfoRoutes),

        ProfileInformationModule,
        NotFoundModule,
        UserAssetsModule
    ],
    exports: [
       WalletInfoComponent
    ]
})

export class WalletInfoModule { 

}