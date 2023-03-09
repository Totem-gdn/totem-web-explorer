import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotemHelpComponent } from './help.component';

const routes: Routes = [
    {
        path: '',
        component: TotemHelpComponent,
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
export class TotemHelpRouting {
}
