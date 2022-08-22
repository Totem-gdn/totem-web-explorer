import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { UserAvatarsComponent } from "./user-avatars.component";
import { UserAvatarsRoutes } from "./user-avatars.routing";


@NgModule({
    declarations: [
        UserAvatarsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserAvatarsRoutes)
    ],
    exports: [
        UserAvatarsComponent
    ]
})

export class UserAvatarsModule {
    
}