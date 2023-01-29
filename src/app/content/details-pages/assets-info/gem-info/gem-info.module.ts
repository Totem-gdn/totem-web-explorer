import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetInfoModule } from "../asset-info.module";
import { GemInfoComponent } from "./gem-info.component";
import { GemInfoRoutes } from "./gem-info.routing";

@NgModule({
    declarations: [
        GemInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(GemInfoRoutes),
        AssetInfoModule
    ],
    exports: [
        GemInfoComponent
    ]
})

export class GemInfoModule {

}