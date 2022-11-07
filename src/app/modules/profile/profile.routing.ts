import { Route } from "@angular/router";
import { ProfileComponent } from "./profile.component";

export const ProfileRoutes: Route[] = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {path: '', redirectTo: 'user-items', pathMatch : 'prefix'},
            {path: 'user-items', data: {}, loadChildren: () => import('@app/modules/profile/dashboard/assets/items/user-items.module').then(m => m.UserItemsModule)},
            {path: 'user-games', loadChildren: () => import('@app/modules/profile/dashboard/assets/games/user-games.module').then(m => m.UserGamesModule)},
            {path: 'user-avatars', loadChildren: () => import('@app/modules/profile/dashboard/assets/avatars/user-avatars.module').then(m => m.UserAvatarsModule)},
            {path: 'messages', loadChildren: () => import('@app/modules/profile/dashboard/messages/messages.module').then(m => m.MessagesModule)},
            {path: 'user-gems', loadChildren: () => import('@app/modules/profile/dashboard/assets/gems/user-gems.module').then(m => m.UserGemsModule)},
            {path: 'favorites', loadChildren: () => import('@app/modules/profile/dashboard/favourites/favourites.module').then(m => m.FavouritesModule)},
        ]
    }
]
