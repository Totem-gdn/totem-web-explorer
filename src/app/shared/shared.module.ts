import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ClickOutsideDirective } from "./directives/click-outside.directive";
import { LoadingSpinner } from "./loading-spinner/locading-spinner.component";


@NgModule({
    declarations: [
        LoadingSpinner,
        ClickOutsideDirective
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ClickOutsideDirective,
        LoadingSpinner
    ]
})

export class SharedModule {

}