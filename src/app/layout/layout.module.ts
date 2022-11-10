import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponentsModule } from './components/layout-components.module';
import { LogoutModule } from './components/popups/logout/logout.module';
import { TransactionPoputModule } from './components/popups/transaction-popup/transaction-popup.module';
import { LayoutComponent } from './layout.component';



@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule,
        LayoutComponentsModule,

        TransactionPoputModule,
        LogoutModule
    ],
    exports     : [
        LayoutComponent,
    ]
})
export class LayoutModule
{
}
