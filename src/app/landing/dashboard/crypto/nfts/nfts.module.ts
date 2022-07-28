import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { NftsComponent } from "./nfts.component";
import { NftsRoutes } from "./nfts.routing";


@NgModule({
    declarations: [
        NftsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(NftsRoutes),
        MatIconModule,
    ]
})

export class NftsModule {

}