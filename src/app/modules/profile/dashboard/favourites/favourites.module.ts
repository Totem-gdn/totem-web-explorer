import { NgModule } from "@angular/core";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { ProfileBackButtonModule } from "../../components/common/profile-back-button/profile-back-button.module";
import { FavouritesRoutes } from "./favourites.routing";
import { FavouritesComponent } from "./favourites.component";
import { ProfileStatsModule } from "../../components/common/profile-stats/profile-stats.module";
import { FilterComponentsModule } from "@app/components/common/filters-components/filter-components.module";
import { MatRippleModule } from "@angular/material/core";


@NgModule({
    declarations: [
      FavouritesComponent
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(FavouritesRoutes),
        MatButtonModule,
        FlexLayoutModule,
        MatIconModule,
        MatRippleModule,

        ProfileBackButtonModule,
        FilterComponentsModule,
        ProfileStatsModule
    ],
    exports: [
      FavouritesComponent
    ]
})

export class FavouritesModule {

}
