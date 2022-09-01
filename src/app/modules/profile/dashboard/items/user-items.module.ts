import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { ItemsModule } from "@app/modules/landing/items/items.module";
import { SharedModule } from "@app/shared/shared.module";
import { SwiperModule } from "swiper/angular";
import { UserItemsComponent } from "./user-items.component";
import { UserItemsRoutes } from "./user-items.routing";


@NgModule({
    declarations: [
        UserItemsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserItemsRoutes),
        ItemsModule,

        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        SwiperModule,
    ],
    exports: [
        UserItemsComponent
    ]
})

export class UserItemsModule {

}
