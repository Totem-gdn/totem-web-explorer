import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterComponentsModule } from "@app/modules/landing/components/filters-components/filter-components.module";
import { SharedModule } from "@app/shared/shared.module";
import { UserAvatarsComponent } from "./user-avatars.component";
import { UserAvatarsRoutes } from "./user-avatars.routing";


@NgModule({
    declarations: [
        UserAvatarsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserAvatarsRoutes),

        FilterComponentsModule
    ],
    exports: [
        UserAvatarsComponent
    ]
})

export class UserAvatarsModule {

}
