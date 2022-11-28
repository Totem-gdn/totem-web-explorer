import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TotemSpinnerModule } from "../../shared/totem-spinner/totem-spinner.module";
import { ProfileInfoModule } from "./components/profile-info/profile-info.module";
import { ProfileNavigationModule } from "./components/profile-navigation/profile-navigation.module";
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
        ProfileNavigationModule,
        TotemSpinnerModule
    ],
    exports: [
        ProfileComponent
    ]
})

export class ProfileModule {

}
