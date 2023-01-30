import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetInfoModule } from "../asset-info.module";
import { AvatarInfoComponent } from "./avatar-info.component";
import { AvatarInfoRoutes } from "./avatar-info.routing";


@NgModule({
    declarations: [
        AvatarInfoComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(AvatarInfoRoutes),
        AssetInfoModule
    ],
    exports: [
        AvatarInfoComponent
    ]
})

export class AvatarInfoModule {

}