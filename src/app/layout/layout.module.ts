import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HomeLayoutModule } from './layouts/home/home.module';
import { LandingLayoutModule } from './layouts/landing/landing.module';



@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports     : [
        SharedModule,
        HomeLayoutModule,
        LandingLayoutModule,
    ],
    exports     : [
        LayoutComponent,
        HomeLayoutModule,
        LandingLayoutModule,
    ]
})
export class LayoutModule
{
}
