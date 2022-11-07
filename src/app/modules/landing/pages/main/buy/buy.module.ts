import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { TotemButtonModule } from "@app/components/utils/totem-button/totem-button.module";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../../../../components/utils/bg-circle/bg-circle.module";
import { BuyComponent } from "./buy.component";
import { BuyRoutes } from "./buy.routing";


@NgModule({
    declarations: [
        BuyComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(BuyRoutes),
        TotemButtonModule,

        MatIconModule,
        BackgroundCircleModule
    ],
    exports: [
        BuyComponent
    ]
})

export class BuyModule {

}