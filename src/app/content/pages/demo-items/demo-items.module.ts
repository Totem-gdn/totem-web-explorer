import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AssetsListModule } from "../components/assets-list/assets-list.module";
import { DemoItemsComponent } from "./demo-items.component";
import { DemoItemsRoutes } from "./demo-items.routing";

@NgModule({
    declarations: [
        DemoItemsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(DemoItemsRoutes),

        AssetsListModule
    ],
    exports: [
        DemoItemsComponent
    ]
})

export class DemoItemsModule {

}