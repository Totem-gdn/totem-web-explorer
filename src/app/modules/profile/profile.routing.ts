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
            {path: 'messages', loadChildren: () => import('@app/modules/profile/dashboard/messages/messages.module').then(m => m.MessagesModule)},
            {path: 'owned-nfts', loadChildren: () => import('@app/modules/profile/dashboard/owned-nfts/owned-nfts.module').then(m => m.OwnedNftsModule)},
            {path: 'transactions', loadChildren: () => import('@app/modules/profile/dashboard/transactions/transactions.module').then(m => m.TransactionsModule)},
            {path: 'buy', loadChildren: () => import('@app/modules/profile/dashboard/buy/buy.module').then(m => m.BuyModule)},
            {path: '', pathMatch : 'full', redirectTo: 'items'},
        ]
    }
]
