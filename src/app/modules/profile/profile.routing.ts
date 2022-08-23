import { Route } from "@angular/router";
import { ProfileComponent } from "./profile.component";

export const ProfileRoutes: Route[] = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {path: 'items', loadChildren: () => import('@app/modules/profile/dashboard/items/user-items.module').then(m => m.UserItemsModule)},
            {path: 'games', loadChildren: () => import('@app/modules/profile/dashboard/games/user-games.module').then(m => m.UserGamesModule)},
            {path: 'avatars', loadChildren: () => import('@app/modules/profile/dashboard/avatars/user-avatars.module').then(m => m.UserAvatarsModule)},
        ]
    }
]