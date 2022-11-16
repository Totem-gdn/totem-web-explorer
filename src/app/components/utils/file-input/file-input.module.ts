import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { FileInputComponent } from "./file-input.component";


@NgModule({
    declarations: [
        FileInputComponent
    ],
    imports: [
        SharedModule,
    ],
    exports: [
        FileInputComponent
    ]
})

export class FileInputModule {

}
