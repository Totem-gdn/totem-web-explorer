import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
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
        ProfileInfoModule
    ]
})

export class ProfileModule {

}