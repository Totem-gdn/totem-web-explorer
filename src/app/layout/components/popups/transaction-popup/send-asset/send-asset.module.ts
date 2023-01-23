import { NgModule } from "@angular/core";
import { BackgroundCircleModule } from "@app/components/utils/bg-circle/bg-circle.module";
import { SharedModule } from "@app/shared/shared.module";
import { PaymentMethodModule } from "../payment-method/payment-method.module";
import { AttributesModule } from "./attributes/attributes.module";
import { SendAssetComponent } from "./send-asset.component";

@NgModule({
    declarations: [
        SendAssetComponent
    ],
    imports: [
        SharedModule,
        AttributesModule,

        PaymentMethodModule,
        BackgroundCircleModule
    ],
    exports: [
        SendAssetComponent
    ]
})

export class SendAssetModule {
    
}