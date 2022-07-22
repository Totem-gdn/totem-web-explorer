import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AboutComponent } from "./about.component";
import { AboutRoutes } from "./about.routing";



@NgModule({
    declarations: [
        AboutComponent,
    ],
    imports: [
        RouterModule.forChild(AboutRoutes),
        SharedModule
    ]
})  

export class AboutModule {

}