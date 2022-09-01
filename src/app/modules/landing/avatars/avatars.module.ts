import { NgModule } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";
import { RouterModule } from "@angular/router";
import { SharedModule } from "@app/shared/shared.module";
import { AvatarCardModule } from "../components/common-components/cards/avatar-card/avatar-card.module";
import { TotemButtonModule } from "../components/common-components/totem-button/totem-button.module";
import { AvatarFilterModule } from "../components/filters-components/filters/avatars-filter/avatars-filter.module";
import { FilterNavModule } from "../components/filters-components/filters/components/filter-nav/filter-nav.module";
import { FilterTagsModule } from "../components/filters-components/filters/components/filter-nav/filter-tags/filter-tags.module";
import { FilterUpdateModule } from "../components/filters-components/filters/components/filter-nav/filter-update/filter-update.module";
import { AvatarsComponent } from "./avatars.component";
import { AvatarsRoutes } from "./avatars.routing";



@NgModule({
    declarations: [
        AvatarsComponent
    ],
    imports: [
        RouterModule.forChild(AvatarsRoutes),
        SharedModule,
        MatIconModule,

        AvatarFilterModule,
        FilterNavModule,
        AvatarFilterModule,
        AvatarCardModule,
        FilterTagsModule,
        FilterUpdateModule,
        TotemButtonModule
    ],
    exports: [
        AvatarsComponent
    ]
})

export class AvatarsModule {

}