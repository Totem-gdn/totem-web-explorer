
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CardsModule } from '../common-components/cards/cards.module';
import { TotemButtonModule } from '../common-components/totem-button/totem-button.module';
import { FilterComponentsComponent } from './filter-components.component';
import { FilterMenuModule } from './components/components/filter-menu/filter-menu.module';
import { FilterNavModule } from './components/components/filter-nav/filter-nav.module';
import { FilterTagsModule } from './components/components/filter-nav/filter-tags/filter-tags.module';
import { FilterUpdateModule } from './components/components/filter-nav/filter-update/filter-update.module';
import { GamesFilterModule } from './components/games-filter/games-filter.module';
import { AssetsFilterModule } from './components/assets-filter/assets-filter.module';
import { TotemSpinnerModule } from '../common-components/totem-spinner/totem-spinner.module';

@NgModule({
    declarations: [
        FilterComponentsComponent
    ],
    imports: [
        FilterNavModule,
        FilterMenuModule,
        // FilterTagsModule,
        // FilterUpdateModule,
        
        GamesFilterModule,
        AssetsFilterModule,
        CardsModule,
        TotemSpinnerModule,

        TotemButtonModule,
        SharedModule
    ],
    exports: [
        FilterComponentsComponent
    ]
})
 
export class FilterComponentsModule {

}