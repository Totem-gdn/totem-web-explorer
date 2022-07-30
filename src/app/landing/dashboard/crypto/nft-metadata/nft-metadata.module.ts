import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { NftMetadataComponent } from "./nft-metadata.component";
import { NftMetadataRoutes } from "./nft-metadata.routing";


@NgModule({
    declarations: [
        NftMetadataComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(NftMetadataRoutes),
        MatIconModule,
    ]
})

export class NftMetadataModule {

}