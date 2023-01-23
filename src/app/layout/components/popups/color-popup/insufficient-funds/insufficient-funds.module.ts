import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { InsufficientFundsComponent } from "./insufficient-funds.component";


@NgModule({
    declarations: [
        InsufficientFundsComponent,
    ],
    imports: [
        SharedModule
    ],
    exports: [
        InsufficientFundsComponent
    ]
})

export class InsufficientFundsModule {

}