import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { ArrowLeft } from "./arrow-left.component";
import { ArrowRight } from "./arrow-right.component";


@NgModule({
    declarations: [
        ArrowLeft,
        ArrowRight
    ],
    imports: [
        HttpClientModule,
        MatIconModule
    ],
    exports: [
        ArrowLeft,
        ArrowRight
    ]
})

export class ArrowsModule {

}