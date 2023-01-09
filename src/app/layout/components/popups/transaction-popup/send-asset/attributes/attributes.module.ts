import { NgModule } from "@angular/core";
import { BackgroundCircleModule } from "@app/components/utils/bg-circle/bg-circle.module";
import { SharedModule } from "@app/shared/shared.module";
import { AttributesComponent } from "./attributes.component";


@NgModule({
    declarations: [
        AttributesComponent
    ],
    imports: [
        SharedModule,

        BackgroundCircleModule
    ],
    exports: [
        AttributesComponent
    ]
})

export class AttributesModule {
    
}