import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AvatarsModule } from "@app/modules/landing/avatars/avatars.module";
import { SharedModule } from "@app/shared/shared.module";
import { UserAvatarsComponent } from "./user-avatars.component";
import { UserAvatarsRoutes } from "./user-avatars.routing";


@NgModule({
    declarations: [
        UserAvatarsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserAvatarsRoutes),
        AvatarsModule
    ],
    exports: [
        UserAvatarsComponent
    ]
})

export class UserAvatarsModule {

}
