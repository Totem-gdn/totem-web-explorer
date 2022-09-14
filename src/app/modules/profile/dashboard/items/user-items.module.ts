import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FilterComponentsModule } from "@app/modules/landing/components/filters-components/filter-components.module";

import { SharedModule } from "@app/shared/shared.module";
import { ProfileStatsModule } from "../../components/profile-stats/profile-stats.module";
import { UserItemsComponent } from "./user-items.component";
import { UserItemsRoutes } from "./user-items.routing";


@NgModule({
    declarations: [
        UserItemsComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(UserItemsRoutes),

        FilterComponentsModule,
        ProfileStatsModule
    ],
    exports: [
        UserItemsComponent
    ]
})

export class UserItemsModule {

}
