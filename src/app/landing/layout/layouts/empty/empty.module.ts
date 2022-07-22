import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoadingBarModule } from '@app/core/loading-bar/loading-bar.module';
import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutComponent } from './empty.component';

@NgModule({
    declarations: [
        EmptyLayoutComponent
    ],
    imports     : [
        RouterModule,
        LoadingBarModule,
        SharedModule
    ],
    exports     : [
        EmptyLayoutComponent
    ]
})
export class EmptyLayoutModule
{
}
