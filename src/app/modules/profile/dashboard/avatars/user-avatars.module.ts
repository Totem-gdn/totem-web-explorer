import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AvatarsModule } from "@app/modules/landing/avatars/avatars.module";
import { AvatarCardModule } from "@app/modules/landing/components/common-components/cards/avatar-card/avatar-card.module";
import { TotemButtonModule } from "@app/modules/landing/components/common-components/totem-button/totem-button.module";
import { AvatarFilterModule } from "@app/modules/landing/components/filters-components/filters/avatars-filter/avatars-filter.module";
import { FilterNavModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-nav.module";
import { FilterTagsModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-tags/filter-tags.module";
import { FilterUpdateModule } from "@app/modules/landing/components/filters-components/filters/components/filter-nav/filter-update/filter-update.module";
import { ItemFilterModule } from "@app/modules/landing/components/filters-components/filters/item-filter/item-filter.module";
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

        FilterNavModule,
        ItemFilterModule,
        TotemButtonModule,
        AvatarFilterModule,
        FilterUpdateModule,
        FilterTagsModule,
        AvatarCardModule
    ],
    exports: [
        UserAvatarsComponent
    ]
})

export class UserAvatarsModule {
    
}