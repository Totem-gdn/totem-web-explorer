import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileNavigationModule } from "./components/profile-navigation/profile-navigation.module";
import { ProfileStatsModule } from "./components/profile-stats/profile-stats.module";
import { UserItemsModule } from "./dashboard/assets/items/user-items.module";
import { ProfileInfoModule } from "./profile-info/profile-info.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutes } from "./profile.routing";


@NgModule({
    declarations: [
        ProfileComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ProfileRoutes),
        ProfileInfoModule,
        ProfileNavigationModule
    ],
    exports: [
        ProfileComponent
    ]
})

export class ProfileModule {

}
