import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleComponent } from "./bg-circle.component";


@NgModule({
    declarations: [
        BackgroundCircleComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        BackgroundCircleComponent
    ]
})

export class BackgroundCircleModule {

}