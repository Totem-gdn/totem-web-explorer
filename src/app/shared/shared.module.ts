import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ArraySlicePipe } from "@app/core/pipes/array-slice.pipe";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { LongPressDirective } from "./directives/long-press.directive";
import { OnDragDirective } from "./directives/on-drag.directive";
import { OnResizeDirective } from "./directives/on-resize.directive";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";
import { TimeCreationPipe } from "./pipes/creationTime.pipe";


@NgModule({
    declarations: [
        LoadingSpinner,
        OnResizeDirective,
        ClickOutsideDirective,
        LongPressDirective,
        OnDragDirective,
        OnResizeDirective,

        TimeCreationPipe,
        ArraySlicePipe
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ClickOutsideDirective,
        LoadingSpinner,
        LongPressDirective,
        OnDragDirective,
        OnResizeDirective,

        TimeCreationPipe,
        ArraySlicePipe
    ]
})

export class SharedModule {

}
