import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
// import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { OnResizeDirective } from "./directives/on-resize.directive";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";


@NgModule({
    declarations: [
        LoadingSpinner,
        OnResizeDirective,
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        LoadingSpinner,
    ]
})

export class SharedModule {

}