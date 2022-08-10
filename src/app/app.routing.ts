
import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Route[] = [

  {path: '', pathMatch : 'full', redirectTo: 'home'},


  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'items', loadChildren: () => import('app/modules/landing/items/items.module').then(m => m.ItemsModule) },
      { path: 'home', loadChildren: () => import('app/modules/landing/home/home.module').then(m => m.HomeModule) },
      { path: 'avatars', loadChildren: () => import('app/modules/landing/avatars/avatars.module').then(m => m.AvatarsModule) },
      { path: 'games', loadChildren: () => import('app/modules/landing/games/games.module').then(m => m.GamesModule) },
    ]
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'page', loadChildren: () => import('app/modules/page/page.module').then(m => m.PageModule)},
    ]
  }
]
