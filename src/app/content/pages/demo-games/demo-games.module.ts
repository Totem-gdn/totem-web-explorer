import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetsListModule } from "../components/assets-list/assets-list.module";
import { DemoGamesComponent } from "./demo-games.component";
import { DemoGamesRoutes } from "./demo-games.routing";
import { ReleasedGamesModule } from "../components/released-games/released-games.module";

@NgModule({
    declarations: [
        DemoGamesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(DemoGamesRoutes),

        AssetsListModule,
        ReleasedGamesModule
    ],
    exports: [
        DemoGamesComponent
    ]
})

export class DemoGamesModule {

}
