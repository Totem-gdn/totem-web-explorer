import { NgModule } from "@angular/core";
import { SharedModule } from "app/shared/shared.module";
import { AvatarDescComponent } from "./avatar-desc.component";


@NgModule({
    declarations: [
        AvatarDescComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        AvatarDescComponent
    ]
})

export class AvatarDescModule {

}