import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileNavModule } from "./profile-nav/profile-nav.module";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutes } from "./profile.routing";
import { UserMenuModule } from "./user-menu/user-menu.module";


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ProfileRoutes),
        UserMenuModule,
        ProfileNavModule
    ]
})

export class ProfileModule {

}