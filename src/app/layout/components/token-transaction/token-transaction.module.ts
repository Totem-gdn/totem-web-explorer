import { NgModule } from "@angular/core";
import { CommonDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/common-dropdown/common-dropdown.module";
import { SharedModule } from "@app/shared/shared.module";
import { TokenTransactionComponent } from "./token-transaction.component";


@NgModule({
    declarations: [
        TokenTransactionComponent
    ],
    imports: [
        SharedModule,
        CommonDropdownModule
    ],
    exports: [
        TokenTransactionComponent
    ]
})

export class TokenTransactionModule {
    
}