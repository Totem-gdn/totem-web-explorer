import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TransactionsComponent } from "./transactions.component";
import { TransactionsRoutes } from "./transactions.routing";


@NgModule({
    declarations: [
        TransactionsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(TransactionsRoutes)
    ],
    exports: [
        TransactionsComponent
    ]
})

export class TransactionsModule {
    
}