import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { ArrowsModule } from "../components/arrows/arrows.module";
import { ItemCardModule } from "../components/item-card/item-card.module";
import { NavigationModule } from "../components/navigation/navigation.module";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routing";



@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        RouterModule.forChild(HomeRoutes),
        SharedModule,
        NavigationModule,
        MatIconModule,
        ArrowsModule,
        ItemCardModule
    ]
})  

export class HomeModule {

}