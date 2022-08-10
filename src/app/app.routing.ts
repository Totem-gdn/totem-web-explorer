
import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Route[] = [

  {path: '', pathMatch : 'full', redirectTo: 'home'},


  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('app/modules/landing/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule) },
      { path: 'avatars', loadChildren: () => import('app/modules/landing/avatars/avatars.module').then(m => m.AvatarsModule) },
      { path: 'items', loadChildren: () => import('app/modules/landing/items/items.module').then(m => m.ItemsModule) },
      { path: 'games', loadChildren: () => import('app/modules/landing/games/games.module').then(m => m.GamesModule) },
      
    ]
  },
]
