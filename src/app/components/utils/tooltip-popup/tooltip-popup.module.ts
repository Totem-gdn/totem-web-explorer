import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { TooltipPopupComponent } from "./tooltip-popup.component";

@NgModule({
    declarations: [
        TooltipPopupComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        TooltipPopupComponent
    ]
})

export class TooltipPopupModule {
    
}