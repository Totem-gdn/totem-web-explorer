import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { DashboardRoutes } from './dashboard.routing';
import { DashboardComponent } from './dashboard.component';

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports     : [
        RouterModule.forChild(DashboardRoutes),
        MatButtonModule,
        MatIconModule,
        SharedModule
    ],
})
export class DashboardModule
{
}
