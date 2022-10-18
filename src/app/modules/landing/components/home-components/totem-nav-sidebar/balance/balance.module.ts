import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { TransactionDialogModule } from "@app/modules/landing/modules/transaction-dialog/transaction-dialog.module";
import { SharedModule } from "@app/shared/shared.module";
import { TotemButtonModule } from "../../../common-components/totem-button/totem-button.module";
import { BalanceComponent } from "./balance.component";


@NgModule({
    declarations: [
        BalanceComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        TotemButtonModule,
        TransactionDialogModule,
    ],
    exports: [
        BalanceComponent
    ]
})

export class BalanceModule {

}
