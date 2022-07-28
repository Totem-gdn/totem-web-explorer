import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { CryptoComponent } from "./crypto.component";
import { CryptoRoutes } from "./crypto.routing";


@NgModule({
    declarations: [
        CryptoComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(CryptoRoutes)
    ]
})

export class CryptoModule {

}