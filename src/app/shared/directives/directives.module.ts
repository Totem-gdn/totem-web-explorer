import { NgModule } from "@angular/core";
import { ChangeSrcDirective } from "./change-img-src.directive";
import { CheckObserverDirective } from "./check-observer.directive";
import { ClickOutsideDirective } from "./click-outside.directive";
import { DigitOnlyDirective } from "./digit-only.directive";
import { InViewDirective } from "./in-view.directive";
import { InputEventsDirective } from "./input-events.directive";
import { LongPressDirective } from "./long-press.directive";
import { OnDragDirective } from "./on-drag.directive";
import { OnResizeDirective } from "./on-resize.directive";
import { ScrollToBottomDirective } from "./scroll-to-bottom.directive";

@NgModule({
    declarations: [
        ClickOutsideDirective,
        DigitOnlyDirective,
        InViewDirective,
        LongPressDirective,
        OnDragDirective,
        OnResizeDirective,
        ChangeSrcDirective,
        ScrollToBottomDirective,
        CheckObserverDirective,
        InputEventsDirective
    ],
    exports: [
        ClickOutsideDirective,
        DigitOnlyDirective,
        InViewDirective,
        LongPressDirective,
        OnDragDirective,
        OnResizeDirective,
        ChangeSrcDirective,
        ScrollToBottomDirective,
        CheckObserverDirective,
        InputEventsDirective
    ]
})

export class DirectivesModule {

}