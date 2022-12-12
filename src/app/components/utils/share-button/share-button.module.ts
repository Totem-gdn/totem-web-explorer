import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { ShareButtonComponent } from "./share-button.component";

@NgModule({
    declarations: [
        ShareButtonComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        ShareButtonComponent
    ]
})

export class SharedButtomModule {
    
}