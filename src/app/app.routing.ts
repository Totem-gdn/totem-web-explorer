
import { Route } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LayoutComponent } from './layout/layout.component';
import { TotemLayoutComponent } from './layout/totem-layout/totem-layout.component';

export const AppRoutes: Route[] = [

  {
    path: '',
    component: TotemLayoutComponent,

    children: [
      /* { path: '', loadChildren: () => import('app/modules/landing/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule) }, */
      { path: '', loadChildren: () => import('app/content/totem-homepage/totem-homepage.module').then(m => m.TotemHomepageModule) },


      { path: 'buy', loadChildren: () => import('@app/content/buy-asset/buy-asset.module').then(m => m.TotemBuyAssetModule) },
      { path: 'avatars', loadChildren: () => import('@app/content/pages/demo-avatars/demo-avatars.module').then(m => m.DemoAvatarsModule) },
      { path: 'items', loadChildren: () => import('@app/content/pages/demo-items/demo-items.module').then(m => m.DemoItemsModule) },
      { path: 'games', loadChildren: () => import('@app/content/pages/demo-games/demo-games.module').then(m => m.DemoGamesModule) },
      { path: 'help', loadChildren: () => import('@app/content/help/help.module').then(m => m.TotemHelpModule) },
      { path: 'game/:id', loadChildren: () => import('@app/content/details-pages/game-info/game-info.module').then(m => m.DemoGameInfoModule) },
      { path: 'my-assets', loadChildren: () => import('@app/content/my-assets/my-assets.module').then(m => m.MyAssetsModule), canActivate: [AuthGuard] },
      { path: 'legacy', loadChildren: () => import('@app/content/legacies/totem-legacies.module').then(m => m.LegaciesModule) },
      { path: 'avatar/:id', loadChildren: () => import('@app/content/details-pages/assets-info/avatar-info/avatar-info.module').then(m => m.AvatarInfoModule) },
      { path: 'gem/:id', loadChildren: () => import('@app/content/details-pages/assets-info/gem-info/gem-info.module').then(m => m.GemInfoModule) },
      { path: 'item/:id', loadChildren: () => import('@app/content/details-pages/assets-info/item-info/item-info.module').then(m => m.ItemInfoModule) },
      /* { path: 'item/:id', loadChildren: () => import('@app/content/details-pages/asset-details/asset-details.module').then(m => m.AssetDetailsModule) }, */


      { path: 'profile', loadChildren: () => import('@app/content/profile/profile.module').then(m => m.ProfileModule), canActivate: [AuthGuard] },
      { path: 'profile/:address', loadChildren: () => import('@app/content/details-pages/wallet-info/wallet-info.module').then(m => m.WalletInfoModule) },


      { path: 'submit-game', loadChildren: () => import('@app/modules/specific/add-your-game/add-your-game.module').then(m => m.AddYourGameModule), canActivate: [AuthGuard] },
      { path: 'voting', loadChildren: () => import('@app/content/voting/voting.module').then(m => m.VotingModule), data: {canAccess: 'allow-with-login'}, canActivate: [AuthGuard]},

      // { path: 'game/:id', loadChildren: () => import('@app/modules/landing/pages/game-info/game-info.module').then(m => m.GameInfoModule) },
      // { path: 'avatar/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/avatar-info/avatar-info.module').then(m => m.AvatarInfoModule) },
      // { path: 'gem/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/gem-info/gem-info.module').then(m => m.GemInfoModule) },
      // { path: 'item/:id', loadChildren: () => import('@app/modules/landing/pages/assets-info/item-info/item-info.module').then(m => m.ItemInfoModule) },

      // { path: 'approve-game', loadChildren: () => import('@app/modules/specific/admin/admin.module').then(m => m.AdminModule), canActivate: [AuthGuard] },
    ]
  },

  {
    path: 'not-found',
    pathMatch: 'full',
    loadChildren: () => import('@app/modules/specific/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('@app/modules/specific/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule)
  },


]
