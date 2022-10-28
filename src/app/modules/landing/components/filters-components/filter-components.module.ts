
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CardsModule } from '../common-components/cards/cards.module';
import { TotemButtonModule } from '../common-components/totem-button/totem-button.module';
import { FilterComponentsComponent } from './filter-components.component';
import { FilterMenuModule } from './components/components/filter-menu/filter-menu.module';
import { FilterNavModule } from './components/components/filter-nav/filter-nav.module';
import { GamesFilterModule } from './components/games-filter/games-filter.module';
import { AssetsFilterModule } from './components/assets-filter/assets-filter.module';
import { TotemSpinnerModule } from '../common-components/totem-spinner/totem-spinner.module';
import { GameDropdownModule } from '../common-components/dropdowns/game-dropdown/game-dropdown.module';

@NgModule({
    declarations: [
        FilterComponentsComponent
    ],
    imports: [
        FilterNavModule,
        FilterMenuModule,
        // FilterTagsModule,
        // FilterUpdateModule,
        GameDropdownModule,
        
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