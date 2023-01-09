import { NgModule } from "@angular/core";
import { BackgroundCircleModule } from "@app/components/utils/bg-circle/bg-circle.module";
import { SharedModule } from "@app/shared/shared.module";
import { ColorPopupComponent } from "./color-popup.component";
import { InsufficientFundsModule } from "./insufficient-funds/insufficient-funds.module";
import { LogoutModule } from "./logout/logout.module";

@NgModule({
    declarations: [
        ColorPopupComponent
    ],
    imports: [
        SharedModule,

        BackgroundCircleModule,
        LogoutModule,
        InsufficientFundsModule

    ],
    exports: [
        ColorPopupComponent
    ]
})

export class ColorPopupModule {

}