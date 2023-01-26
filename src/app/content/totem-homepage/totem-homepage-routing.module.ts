import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotemHomepageComponent } from './totem-homepage.component';

const routes: Routes = [
    {
        path: '',
        component: TotemHomepageComponent,
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
export class TotemHomepageRouting {
}
