import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NotFoundModule } from "@app/modules/specific/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { AssetDetailsModule } from "../../asset-details/asset-details.module";
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
        AssetDetailsModule,
        NotFoundModule,
    ],
    exports: [
        AvatarInfoComponent
    ]
})

export class AvatarInfoModule {

}
