import { Route } from "@angular/router"
import { AvatarComponent } from "./avatar/avatar.component"
import { ProfileComponent } from "./profile.component"


export const ProfileRoutes: Route[] = [
    {
        path: '', component: ProfileComponent
    },
    {
        path: 'avatar', component: AvatarComponent
    }
]