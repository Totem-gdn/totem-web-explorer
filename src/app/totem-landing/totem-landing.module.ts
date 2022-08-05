import { NgModule } from '@angular/core';

import { TotemNavigationComponent } from './components/totem-navigation/totem-navigation.component';
import { TotemHomePageModule } from './content/totem-home-page/totem-home-page.module';

import { TotemLayoutComponent } from './layout/totem-layout/totem-layout.component';
import { TotemLandingRouting } from './totem-landing-routing.module';

// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { TotemSearchFilterModule } from './modules/totem-search-filter/totem-search-filter.module';

@NgModule({
  declarations: [
    TotemLayoutComponent,
    TotemNavigationComponent
  ],
  imports: [
    TotemLandingRouting,
    TotemHomePageModule,
    FlexLayoutModule,
    TotemSearchFilterModule
  ],
  exports: [
    TotemNavigationComponent
  ],
  providers: [],
})
export class TotemLandingModule {}
