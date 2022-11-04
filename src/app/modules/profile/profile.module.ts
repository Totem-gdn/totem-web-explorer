import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TotemSpinnerModule } from "../../shared/totem-spinner/totem-spinner.module";
import { ProfileStatsModule } from "./components/common/profile-stats/profile-stats.module";
import { UserItemsModule } from "./dashboard/assets/items/user-items.module";
import { ProfileInfoModule } from "./components/profile-info/profile-info.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutes } from "./profile.routing";
import { ProfileNavigationModule } from "./components/profile-navigation/profile-navigation.module";


@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ProfileRoutes),
        ProfileInfoModule,
        ProfileNavigationModule,
        TotemSpinnerModule
    ],
    exports: [
        ProfileComponent
    ]
})

export class ProfileModule {

}
