import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { SharedModule } from "@app/shared/shared.module";
import { TotemButtonModule } from "../../../common-components/totem-button/totem-button.module";
import { BalanceComponent } from "./balance.component";


@NgModule({
    declarations: [
        BalanceComponent
    ],
    imports: [
        SharedModule,
        MatIconModule,
        TotemButtonModule
    ],
    exports: [
        BalanceComponent
    ]
})

export class BalanceModule {

}