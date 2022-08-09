
import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "app/shared/shared.module";
import { ArrowsModule } from "../components/arrows/arrows.module";
import { AvatarCardModule } from "../components/avatar-card/avatar-card.module";
import { CarouselModule } from "../components/carousel/carousel.module";
import { GameCardModule } from "../components/game-card/game-card.module";
import { ItemCardModule } from "../components/item-card/item-card.module";
import { HomeComponent } from "./home.component";
import { HomeRoutes } from "./home.routing";



@NgModule({
    declarations: [
        HomeComponent,
    ],
    imports: [
        RouterModule.forChild(HomeRoutes),
        SharedModule,
        MatIconModule,
        ArrowsModule,
        ItemCardModule,
        GameCardModule,
        AvatarCardModule,
        CarouselModule
        
    ]
})  

export class HomeModule {

}