import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { TransactionsComponent } from "./transactions.component";
import { TransactionsRoutes } from './transactions.routing';
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    declarations: [
        TransactionsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(TransactionsRoutes),
        MatIconModule
    ]
})


export class TransactionsModule {

}