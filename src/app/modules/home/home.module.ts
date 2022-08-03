import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routing";



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(HomeRoutes),
        SharedModule
    ]
})  

export class HomeModule {

}