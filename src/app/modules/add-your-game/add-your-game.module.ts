import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AddYourGameComponent } from "./add-your-game.component";
import { AddYourGameRoutes } from "./add-your-game.routing";


@NgModule({
    declarations: [
      AddYourGameComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(AddYourGameRoutes),
    ],
    exports: [
      AddYourGameComponent
    ]
})

export class AddYourGameModule {

}
