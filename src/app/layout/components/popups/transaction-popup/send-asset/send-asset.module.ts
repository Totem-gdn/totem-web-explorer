import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { SendAssetComponent } from "./send-asset.component";

@NgModule({
    declarations: [
        SendAssetComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        SendAssetComponent
    ]
})

export class SendAssetModule {
    
}