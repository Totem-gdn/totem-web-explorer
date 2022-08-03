import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
    declarations: [
        LayoutComponent,
        HeaderComponent
    ],
    imports     : [
        SharedModule,
        RouterModule,
        MatIconModule
    ],
    exports     : [
        LayoutComponent,
    ]
})
export class LayoutModule
{
}
