import { NgModule } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { SharedModule } from "@app/shared/shared.module";
import { SendTokensModule } from "./send-tokens/send-tokens.module";
import { SendAssetModule } from "./send-asset/send-asset.module";
import { TransactionPopupComponent } from "./transaction-popup.component";

@NgModule({
    declarations: [
        TransactionPopupComponent
    ],
    imports: [
        SharedModule,
        SendTokensModule,
        SendAssetModule,
        MatRippleModule,
    ],
    exports: [
        TransactionPopupComponent
    ]
})

export class TransactionPoputModule {

}