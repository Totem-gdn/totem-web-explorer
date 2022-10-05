import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { FilterComponentsModule } from "../../components/filters-components/filter-components.module";
import { AvatarsComponent } from "./avatars.component";
import { AvatarsRoutes } from "./avatars.routing";



@NgModule({
    declarations: [
        AvatarsComponent
    ],
    imports: [
        RouterModule.forChild(AvatarsRoutes),
        SharedModule,

        FilterComponentsModule
    ],
    exports: [
        AvatarsComponent
    ]
})

export class AvatarsModule {

}