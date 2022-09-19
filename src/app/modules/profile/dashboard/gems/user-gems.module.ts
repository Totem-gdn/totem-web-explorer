import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterComponentsModule } from "@app/modules/landing/components/filters-components/filter-components.module";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileStatsModule } from "../../components/profile-stats/profile-stats.module";
import { UserGemsComponent } from "./user-gems.component";
import { UserGemsRoutes } from "./user-gems.routing";


@NgModule({
    declarations: [
        UserGemsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserGemsRoutes),

        FilterComponentsModule,
        ProfileStatsModule
    ],
    exports: [
        UserGemsComponent
    ]
})

export class UserGemsModule {
    
}