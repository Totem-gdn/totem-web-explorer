import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TotemLayoutComponent } from './totem-layout.component';

@NgModule({
  declarations: [TotemLayoutComponent],
  imports: [SharedModule, RouterModule],
  exports: [TotemLayoutComponent],
})
export class TotemLayoutModule {}
