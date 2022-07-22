import { NgModule } from '@angular/core';
import { LayoutComponent } from './layout.component';

import { SharedModule } from 'app/shared/shared.module';
import { EmptyLayoutModule } from './layouts/empty/empty.module';
import { ClassyLayoutModule } from './layouts/classy/classy.module';
import { GuestLayoutModule } from './layouts/guest/guest.module';


@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        SharedModule,
        EmptyLayoutModule,
        ClassyLayoutModule,
        GuestLayoutModule
    ],
    exports     : [
        LayoutComponent,
        EmptyLayoutModule,
        ClassyLayoutModule,
        GuestLayoutModule
    ]
})
export class LayoutModule
{
}
