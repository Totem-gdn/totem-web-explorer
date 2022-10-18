import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponentsModule } from './components/layout-components.module';
import { TokenTransactionModule } from './components/token-transaction/token-transaction.module';
import { LayoutComponent } from './layout.component';



@NgModule({
    declarations: [
        LayoutComponent,
    ],
    imports     : [
        SharedModule,
        RouterModule,
        LayoutComponentsModule,

        TokenTransactionModule
    ],
    exports     : [
        LayoutComponent,
    ]
})
export class LayoutModule
{
}
