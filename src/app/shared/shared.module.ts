import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ClickOutsideDirective } from "./directives/click-outside.directive";


@NgModule({
    declarations: [
        ClickOutsideDirective
    ],
    imports: [
        CommonModule,
        HttpClientModule
    ],
    exports: [
        CommonModule,
        HttpClientModule,
        ClickOutsideDirective
    ]
})

export class SharedModule {

}