import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TotemSidenavComponent } from './totem-sidenav.component';

@NgModule({
  declarations: [TotemSidenavComponent],
  imports: [SharedModule, RouterModule],
  exports: [TotemSidenavComponent],
})
export class TotemSidenavModule {}
