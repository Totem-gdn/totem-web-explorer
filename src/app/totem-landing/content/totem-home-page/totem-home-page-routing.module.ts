import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotemHomePageComponent } from './components/totem-home-page.component';

const routes: Routes = [
    {
        path: '',
        component: TotemHomePageComponent,
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
export class TotemHomePageRouting {
}
