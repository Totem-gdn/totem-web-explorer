import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { LongPressDirective } from "./directives/long-press.directive";
import { OnResizeDirective } from "./directives/on-resize.directive";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";


@NgModule({
    declarations: [
        LoadingSpinner,
        OnResizeDirective,
        ClickOutsideDirective,
        LongPressDirective
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
        LongPressDirective
    ]
})

export class SharedModule {

}
