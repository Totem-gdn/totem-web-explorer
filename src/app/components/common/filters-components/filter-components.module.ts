
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { CardsModule } from '../cards/cards.module';
import { TotemButtonModule } from '../../utils/totem-button/totem-button.module';
import { FilterComponentsComponent } from './filter-components.component';
import { FilterNavModule } from './filter-menus/filter-nav/filter-nav.module';
import { TotemSpinnerModule } from '../../../shared/totem-spinner/totem-spinner.module';
import { GameDropdownModule } from '../dropdowns/game-dropdown/game-dropdown.module';
import { FilterMenusModule } from './filter-menus/filter-menus.module';

@NgModule({
    declarations: [
        FilterComponentsComponent
    ],
    imports: [
        FilterNavModule,
        GameDropdownModule,
        
        // GamesFilterModule,
        // AssetsFilterModule,
        FilterMenusModule,
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