import { NgModule } from "@angular/core";
import { ClickOutsideDirective } from "./click-outside.directive";
import { DigitOnlyDirective } from "./digit-only.directive";
import { InViewDirective } from "./in-view.directive";
import { LongPressDirective } from "./long-press.directive";
import { OnDragDirective } from "./on-drag.directive";
import { OnResizeDirective } from "./on-resize.directive";

@NgModule({
    declarations: [
        ClickOutsideDirective,
        DigitOnlyDirective,
        InViewDirective,
        LongPressDirective,
        OnDragDirective,
        OnResizeDirective
    ],
    exports: [
        ClickOutsideDirective,
        DigitOnlyDirective,
        InViewDirective,
        LongPressDirective,
        OnDragDirective,
        OnResizeDirective
    ]
})

export class DirectivesModule {

}