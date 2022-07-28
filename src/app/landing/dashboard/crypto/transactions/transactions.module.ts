import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TransactionsComponent } from "./transactions.component";
import { TransactionsRoutes } from './transactions.routing';
import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';

@NgModule({
    declarations: [
        TransactionsComponent,
        TransactionDetailComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(TransactionsRoutes)
    ]
})


export class TransactionsModule {

}