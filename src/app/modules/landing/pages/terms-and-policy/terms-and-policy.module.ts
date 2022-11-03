import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../components/utils/bg-circle/bg-circle.module";
import { TotemButtonModule } from "../../../../components/utils/totem-button/totem-button.module";
import { TermsAndPolicyComponent } from "./terms-and-policy.component";
import { TermsAndPolicyRoutes } from "./terms-and-policy.routing";


@NgModule({
    declarations: [
      TermsAndPolicyComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(TermsAndPolicyRoutes),

        MatIconModule,
        TotemButtonModule,
        BackgroundCircleModule,
        FlexLayoutModule,
        MatRippleModule
    ],
    exports: [
      TermsAndPolicyComponent
    ]
})

export class TermsAndPolicyModule {

}
