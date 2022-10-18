
import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './modules/page-not-found/page-not-found.component';

export const AppRoutes: Route[] = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('app/modules/landing/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule) },

      { path: 'avatars', loadChildren: () => import('@app/modules/landing/pages/avatars/avatars.module').then(m => m.AvatarsModule) },
      { path: 'items', loadChildren: () => import('@app/modules/landing/pages/items/items.module').then(m => m.ItemsModule) },
      { path: 'games', loadChildren: () => import('@app/modules/landing/pages/games/games.module').then(m => m.GamesModule) },
      { path: 'buy', loadChildren: () => import('@app/modules/landing/pages/buy/buy.module').then(m => m.BuyModule)},
      { path: 'help', loadChildren: () => import('@app/modules/landing/pages/help/help.module').then(m => m.HelpModule)},
      { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },

      { path: 'submit-game', loadChildren: () => import('app/modules/add-your-game/add-your-game.module').then(m => m.AddYourGameModule) },

      { path: 'game/:id', loadChildren: () => import('@app/modules/landing/pages/game-info/game-info.module').then(m => m.GameInfoModule)},
      { path: 'avatar/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/avatar-info/avatar-info.module').then(m => m.AvatarInfoModule)},
      { path: 'gem/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/gem-info/gem-info.module').then(m => m.GemInfoModule)},
      { path: 'item/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/item-info/item-info.module').then(m => m.ItemInfoModule)},

    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('@app/modules/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }

]
