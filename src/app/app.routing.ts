
import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Route[] = [

  {path: '', pathMatch : 'full', redirectTo: 'home'},

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'home', loadChildren: () => import('app/modules/home/home.module').then(m => m.HomeModule)},
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
