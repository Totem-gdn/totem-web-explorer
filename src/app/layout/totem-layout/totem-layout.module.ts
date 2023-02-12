import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { TotemSideselectorModule } from '@app/modules/totem-sideselector/totem-sideselector.module';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutComponentsModule } from '../components/layout-components.module';
import { ExploreDropdownModule } from '../components/totem-header/explore-dropdown/explore-dropdown.module';
import { TotemSidenavModule } from '../components/totem-sidenav/totem-sidenav.module';
import { TotemLayoutComponent } from './totem-layout.component';

@NgModule({
  declarations: [TotemLayoutComponent],
  imports: [
    SharedModule,
    RouterModule,
    LayoutComponentsModule,
    TotemSidenavModule, 
    TotemSideselectorModule, 
    MatIconModule, 
    MatRippleModule,


    ExploreDropdownModule
  ],
  exports: [TotemLayoutComponent],
})
export class TotemLayoutModule { }
