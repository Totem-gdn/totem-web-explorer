import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ContractsComponent } from "./contracts.component";
import { ContractsRoutes } from "./contracts.routing";


@NgModule({
    declarations: [
        ContractsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(ContractsRoutes),
    ],
    exports: [
        ContractsComponent
    ]

})

export class ContractsModule {

}