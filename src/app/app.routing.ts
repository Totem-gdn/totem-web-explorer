
import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const AppRoutes: Route[] = [

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'home', loadChildren: () => import('src/app/layout/modules/home/home.module').then(m => m.HomeModule)},
    ]
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {path: 'page', loadChildren: () => import('src/app/layout/modules/page/page.module').then(m => m.PageModule)},
    ]
  }
]
