import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { HelpComponent } from "./help.component";
import { HelpRoutes } from "./help.routing";

@NgModule({
    declarations: [
        HelpComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(HelpRoutes)
    ],
    exports: [
        HelpComponent
    ]
})

export class HelpModule {

}