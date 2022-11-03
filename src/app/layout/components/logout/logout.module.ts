import { NgModule } from "@angular/core";
import { MatRippleModule } from "@angular/material/core";
import { BackgroundCircleModule } from "@app/modules/landing/components/common-components/bg-circle/bg-circle.module";
import { SharedModule } from "@app/shared/shared.module";
import { LogoutComponent } from "./logout.component";

@NgModule({
    declarations: [
        LogoutComponent
    ],
    imports: [
        SharedModule,
        BackgroundCircleModule,
        MatRippleModule,
    ],
    exports: [
        LogoutComponent
    ]
})

export class LogoutModule {

}