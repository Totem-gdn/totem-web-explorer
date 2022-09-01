import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { CreateNftComponent } from "./create-nft.component";
import { CreateNftRoutes } from "./create-nft.routing";


@NgModule({
    declarations: [
        CreateNftComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(CreateNftRoutes),
    ],
    exports: [
        CreateNftComponent
    ]

})

export class ContractsModule {

}