import { NgModule } from "@angular/core";
import { BackgroundCircleModule } from "@app/components/utils/bg-circle/bg-circle.module";
import { SharedModule } from "@app/shared/shared.module";
import { ColorPopupComponent } from "./color-popup.component";
import { LogoutModule } from "./logout/logout.module";

@NgModule({
    declarations: [
        ColorPopupComponent
    ],
    imports: [
        SharedModule,

        BackgroundCircleModule,
        LogoutModule
    ],
    exports: [
        ColorPopupComponent
    ]
})

export class ColorPopupModule {

}