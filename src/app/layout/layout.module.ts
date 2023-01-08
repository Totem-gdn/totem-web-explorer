import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponentsModule } from './components/layout-components.module';
import { ColorPopupModule } from './components/popups/color-popup/color-popup.module';
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
        ColorPopupModule
    ],
    exports     : [
        LayoutComponent,
    ]
})
export class LayoutModule
{
}
