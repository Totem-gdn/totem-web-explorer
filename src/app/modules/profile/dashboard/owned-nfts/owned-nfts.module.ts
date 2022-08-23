import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { OwnedNftsComponent } from "./owned-nfts.component";
import { OwnedNftsRoutes } from "./owned-nfts.routing";


@NgModule({
    declarations: [
        OwnedNftsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(OwnedNftsRoutes)
    ],
    exports: [
        OwnedNftsComponent
    ]
})

export class OwnedNftsModule {
    
}