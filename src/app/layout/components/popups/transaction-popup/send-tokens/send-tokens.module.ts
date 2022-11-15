import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { CommonDropdownModule } from "@app/components/common/dropdowns/common-dropdown/common-dropdown.module";
import { SharedModule } from "@app/shared/shared.module";
import { SendTokensComponent } from "./send-tokens.component";


@NgModule({
    declarations: [
        SendTokensComponent
    ],
    imports: [
        SharedModule,
        CommonDropdownModule,
        ReactiveFormsModule

    ],
    exports: [
        SendTokensComponent
    ]
})

export class SendTokensModule {

}