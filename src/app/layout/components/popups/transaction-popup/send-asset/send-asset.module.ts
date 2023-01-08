import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared/shared.module";
import { AttributesModule } from "./attributes/attributes.module";
import { SendAssetComponent } from "./send-asset.component";

@NgModule({
    declarations: [
        SendAssetComponent
    ],
    imports: [
        SharedModule,
        AttributesModule
    ],
    exports: [
        SendAssetComponent
    ]
})

export class SendAssetModule {
    
}