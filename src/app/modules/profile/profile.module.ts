import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileInfoComponent } from "./profile-info/profile-info.component";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutes } from "./profile.routing";


@NgModule({
    declarations: [
        ProfileComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ProfileRoutes),
        ProfileInfoComponent
    ]
})

export class ProfileModule {

}