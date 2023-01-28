import { Route } from "@angular/router";
import { DemoAvatarsComponent } from "@app/content/pages/demo-avatars/demo-avatars.component";
import { DemoGameInfoComponent } from "./game-info.component";


export const DemoGameInfoRoutes: Route[] =[
    {
        path: '', component: DemoGameInfoComponent
    }
]