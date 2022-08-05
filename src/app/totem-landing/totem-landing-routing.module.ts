import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotemLayoutComponent } from './layout/totem-layout/totem-layout.component';

const routes: Routes = [
    {
        path: '',
        component: TotemLayoutComponent,
        children: [
            {
                path: 'homepage',
                loadChildren: () => import('./content/totem-home-page/totem-home-page.module').then(m => m.TotemHomePageModule),
            },
            {
                path: '**',
                pathMatch: 'full',
                redirectTo: 'homepage',
            },
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class TotemLandingRouting {
}
