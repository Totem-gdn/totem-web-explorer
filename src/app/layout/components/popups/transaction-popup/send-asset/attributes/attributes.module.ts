import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { AttributesComponent } from "./attributes.component";


@NgModule({
    declarations: [
        AttributesComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        AttributesComponent
    ]
})

export class AttributesModule {
    
}