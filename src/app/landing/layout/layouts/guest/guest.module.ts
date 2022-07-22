import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoadingBarModule } from '@app/core/loading-bar/loading-bar.module';
import { UserModule } from '../../user/user.module';
import { GuestLayoutComponent } from './guest.component';

@NgModule({
    declarations: [
        GuestLayoutComponent,
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        LoadingBarModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        GuestLayoutComponent
    ]
})
export class GuestLayoutModule
{
}
