import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HomeLayoutModule } from './layouts/home/home.module';



@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports     : [
        SharedModule,
        HomeLayoutModule,
    ],
    exports     : [
        LayoutComponent,
        HomeLayoutModule,
    ]
})
export class LayoutModule
{
}
