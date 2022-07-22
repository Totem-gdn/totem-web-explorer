import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AvatarComponent } from "./avatar/avatar.component";
import { ProfileComponent } from "./profile.component";
import { ProfileRoutes } from "./profile.routes";


@NgModule({
    declarations: [
        ProfileComponent,
        AvatarComponent
    ],
    imports: [
        RouterModule.forChild(ProfileRoutes),
        SharedModule,
        MatIconModule,
        MatMenuModule
    ]
})

export class ProfileModule {
    
}