import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { PageComponent } from "./page.component";
import { PageRoutes } from "./page.routing";



@NgModule({
    declarations: [
        PageComponent
    ],
    imports: [
        RouterModule.forChild(PageRoutes),
        SharedModule
    ]
})  

export class PageModule {

}