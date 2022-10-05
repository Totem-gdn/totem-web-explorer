
import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfileResolver } from './core/resolvers/profile.resolver';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Route[] = [

  {path: '', pathMatch : 'full', redirectTo: 'home'},

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('app/modules/landing/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule) },

      { path: 'avatars', loadChildren: () => import('@app/modules/landing/pages/avatars/avatars.module').then(m => m.AvatarsModule) },
      { path: 'items', loadChildren: () => import('@app/modules/landing/pages/items/items.module').then(m => m.ItemsModule) },
      { path: 'games', loadChildren: () => import('@app/modules/landing/pages/games/games.module').then(m => m.GamesModule) },
      { path: 'item-info', loadChildren: () => import('app/modules/landing/item-info/item-info.module').then(m => m.ItemInfoMadule) },
      { path: 'buy', loadChildren: () => import('@app/modules/landing/pages/buy/buy.module').then(m => m.BuyModule)},
      { path: 'help', loadChildren: () => import('@app/modules/landing/pages/help/help.module').then(m => m.HelpModule)},
      { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },

      { path: 'submit-game', loadChildren: () => import('app/modules/add-your-game/add-your-game.module').then(m => m.AddYourGameModule) },
    ]
  },

]
