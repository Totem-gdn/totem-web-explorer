import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { MatRippleModule } from "@angular/material/core";
import { CommonDropdownModule } from "@app/modules/landing/components/common-components/dropdowns/common-dropdown/common-dropdown.module";
import { SharedModule } from "@app/shared/shared.module";
import { TokenTransactionComponent } from "./token-transaction.component";


@NgModule({
    declarations: [
        TokenTransactionComponent
    ],
    imports: [
        SharedModule,
        CommonDropdownModule,
        ReactiveFormsModule,
        MatRippleModule
    ],
    exports: [
        TokenTransactionComponent
    ]
})

export class TokenTransactionModule {
    
}