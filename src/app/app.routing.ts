
import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { PageNotFoundComponent } from './modules/specific/page-not-found/page-not-found.component';

export const AppRoutes: Route[] = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('app/modules/landing/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule) },

      { path: 'avatars', loadChildren: () => import('@app/modules/landing/pages/main/avatars/avatars.module').then(m => m.AvatarsModule) },
      { path: 'items', loadChildren: () => import('@app/modules/landing/pages/main/items/items.module').then(m => m.ItemsModule) },
      { path: 'games', loadChildren: () => import('@app/modules/landing/pages/main/games/games.module').then(m => m.GamesModule) },
      { path: 'buy', loadChildren: () => import('@app/modules/landing/pages/main/buy/buy.module').then(m => m.BuyModule)},
      { path: 'help', loadChildren: () => import('@app/modules/landing/pages/main/help/help.module').then(m => m.HelpModule)},
      { path: 'terms-and-policy', loadChildren: () => import('@app/modules/landing/pages/terms-and-policy/terms-and-policy.module').then(m => m.TermsAndPolicyModule)},
      { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },

      { path: 'submit-game', loadChildren: () => import('@app/modules/specific/add-your-game/add-your-game.module').then(m => m.AddYourGameModule), canActivate: [AuthGuard] },

      { path: 'game/:id', loadChildren: () => import('@app/modules/landing/pages/game-info/game-info.module').then(m => m.GameInfoModule)},
      { path: 'avatar/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/avatar-info/avatar-info.module').then(m => m.AvatarInfoModule)},
      { path: 'gem/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/gem-info/gem-info.module').then(m => m.GemInfoModule)},
      { path: 'item/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/item-info/item-info.module').then(m => m.ItemInfoModule)},

      { path: 'approve-game', loadChildren: () => import('@app/modules/specific/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard]},
    ]
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('@app/modules/specific/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  }

]
