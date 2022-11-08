import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterComponentsModule } from "@app/components/common/filters-components/filter-components.module";
import { SharedModule } from "@app/shared/shared.module";
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