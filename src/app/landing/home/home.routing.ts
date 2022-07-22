import { Route } from "@angular/router";
import { HomeComponent } from "./home.component";

export const HomeRoutes: Route[] = [
    {
        path: '',
        component: HomeComponent,
        children: [
            { path: '', redirectTo: 'about', pathMatch: 'prefix'},
            { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
        ]
    }
]