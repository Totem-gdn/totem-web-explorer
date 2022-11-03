import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { TransactionDialogModule } from "@app/layout/components/popups/dialogs/transaction-dialog/transaction-dialog.module";
import { SharedModule } from "@app/shared/shared.module";
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
        FlexLayoutModule,
        MatRippleModule
    ],
    exports: [
        BalanceComponent
    ]
})

export class BalanceModule {

}
