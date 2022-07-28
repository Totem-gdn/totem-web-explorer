import { Route } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

export const DashboardRoutes: Route[] = [
    {
        path     : '',
        component: DashboardComponent,
        children: [
            { path: '', redirectTo: 'items', pathMatch: 'prefix'},
            { path: 'items', loadChildren: () => import('./items/items.module').then(m => m.ItemsModule) },
            { path: 'profile', loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule) },
            { path: 'crypto', loadChildren: () => import('./crypto/crypto.module').then(m => m.CryptoModule)}
        ]
    },

];
