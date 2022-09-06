
import { Route } from '@angular/router';
import { ProfileResolver } from './core/resolvers/profile.resolver';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Route[] = [

  {path: '', pathMatch : 'full', redirectTo: 'home'},


  {
    path: '',
    component: LayoutComponent,
    children: [
      {
         path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)
      },
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('app/modules/landing/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule) },

      { path: 'avatars', loadChildren: () => import('app/modules/landing/avatars/avatars.module').then(m => m.AvatarsModule) },
      { path: 'items', loadChildren: () => import('app/modules/landing/items/items.module').then(m => m.ItemsModule) },
      { path: 'games', loadChildren: () => import('app/modules/landing/games/games.module').then(m => m.GamesModule) },
      { path: 'item-info', loadChildren: () => import('app/modules/landing/item-info/item-info.module').then(m => m.ItemInfoMadule) },
      { path: 'profile', loadChildren: () => import('app/modules/profile/profile.module').then(m => m.ProfileModule)}
    ]
  },

]
