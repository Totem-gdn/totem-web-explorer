import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { PaymentMethodComponent } from "./payment-method.component";


@NgModule({
    declarations: [
        PaymentMethodComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        PaymentMethodComponent
    ]
})

export class PaymentMethodModule {

}