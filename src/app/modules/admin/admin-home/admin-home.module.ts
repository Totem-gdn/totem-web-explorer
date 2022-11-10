import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AdminHomeComponent } from "./admin-home.component";
import { AdminHomeRoutes } from "./admin-home.routing";


@NgModule({
    declarations: [
        AdminHomeComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(AdminHomeRoutes)
    ],
    exports: [
        AdminHomeComponent
    ]
})

export class AdminHomeModule {

}