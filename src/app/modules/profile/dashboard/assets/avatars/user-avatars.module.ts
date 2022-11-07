import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterComponentsModule } from "@app/components/common/filters-components/filter-components.module";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileStatsModule } from "../../../components/common/profile-stats/profile-stats.module";
import { UserAvatarsComponent } from "./user-avatars.component";
import { UserAvatarsRoutes } from "./user-avatars.routing";


@NgModule({
    declarations: [
        UserAvatarsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserAvatarsRoutes),

        FilterComponentsModule,
        ProfileStatsModule
    ],
    exports: [
        UserAvatarsComponent
    ]
})

export class UserAvatarsModule {

}
