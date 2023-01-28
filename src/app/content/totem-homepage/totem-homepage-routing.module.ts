import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SliderWireframeModule } from '@app/modules/demo/slider-wireframe/slider-wireframe.module';
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
