
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { AvatarCardModule } from '../common-components/cards/avatar-card/avatar-card.module';
import { GameCardModule } from '../common-components/cards/game-card/game-card.module';
import { ItemCardModule } from '../common-components/cards/item-card/item-card.module';
import { TotemButtonModule } from '../common-components/totem-button/totem-button.module';
import { FilterComponentsComponent } from './filter-components.component';
import { AvatarFilterModule } from './filters/avatars-filter/avatars-filter.module';
import { FilterMenuModule } from './filters/components/filter-menu/filter-menu.module';
import { FilterNavModule } from './filters/components/filter-nav/filter-nav.module';
import { FilterTagsModule } from './filters/components/filter-nav/filter-tags/filter-tags.module';
import { FilterUpdateModule } from './filters/components/filter-nav/filter-update/filter-update.module';
import { GamesFilterModule } from './filters/games-filter/games-filter.module';
import { ItemFilterModule } from './filters/item-filter/item-filter.module';

@NgModule({
    declarations: [
        FilterComponentsComponent
    ],
    imports: [
        FilterNavModule,
        FilterMenuModule,
        ItemFilterModule,
        AvatarFilterModule,
        GamesFilterModule,
        FilterTagsModule,
        FilterUpdateModule,

        ItemCardModule,
        AvatarCardModule,
        GameCardModule,

        TotemButtonModule,
        SharedModule
    ],
    exports: [
        FilterComponentsComponent
    ]
})
 
export class FilterComponentsModule {

}