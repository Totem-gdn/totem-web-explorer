import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatRippleModule } from "@angular/material/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { NotFoundModule } from "@app/modules/page-not-found/not-found/not-found.module";
import { SharedModule } from "@app/shared/shared.module";
import { BackgroundCircleModule } from "../../components/common-components/bg-circle/bg-circle.module";
import { TotemButtonModule } from "../../components/common-components/totem-button/totem-button.module";
import { CarouselModule } from "../../components/home-components/carousel/carousel.module";
import { AdminComponent } from "./admin.component";
import { AdminRoutes } from "./admin.routing";


@NgModule({
    declarations: [
      AdminComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(AdminRoutes),

        MatIconModule,
        TotemButtonModule,
        CarouselModule,
        BackgroundCircleModule,
        NotFoundModule,
        FlexLayoutModule,
        MatRippleModule
    ],
    exports: [
      AdminComponent
    ]
})

export class AdminModule {

}
