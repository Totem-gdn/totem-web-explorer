import { NgModule } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { SharedModule } from "@app/shared/shared.module";
import { SendTokensModule } from "./send-tokens/send-tokens.module";
import { SendAssetModule } from "./send-asset/send-asset.module";
import { TransactionPopupComponent } from "./transaction-popup.component";
import { PaymentMethodModule } from "./payment-method/payment-method.module";

@NgModule({
    declarations: [
        TransactionPopupComponent
    ],
    imports: [
        SharedModule,
        MatRippleModule,

        SendTokensModule,
        SendAssetModule,
        PaymentMethodModule
    ],
    exports: [
        TransactionPopupComponent
    ]
})

export class TransactionPoputModule {

}