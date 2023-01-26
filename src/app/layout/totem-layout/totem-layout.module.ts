import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { LayoutComponentsModule } from '../components/layout-components.module';
import { TotemSidenavModule } from '../components/totem-sidenav/totem-sidenav.module';
import { TotemLayoutComponent } from './totem-layout.component';

@NgModule({
  declarations: [TotemLayoutComponent],
  imports: [SharedModule, RouterModule, LayoutComponentsModule, TotemSidenavModule],
  exports: [TotemLayoutComponent],
})
export class TotemLayoutModule {}
