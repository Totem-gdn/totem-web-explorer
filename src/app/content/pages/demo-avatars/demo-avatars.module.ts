import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetsListModule } from "../components/assets-list/assets-list.module";
import { DemoAvatarsComponent } from "./demo-avatars.component";
import { DemoAvatarsRoutes } from "./demo-avatars.routing";

@NgModule({
    declarations: [
        DemoAvatarsComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(DemoAvatarsRoutes),

        AssetsListModule
    ],
    exports: [
        DemoAvatarsComponent
    ]
})

export class DemoAvatarsModule {

}