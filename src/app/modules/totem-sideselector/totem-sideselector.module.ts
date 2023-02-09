import { NgModule } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TotemSideselectorComponent } from './totem-sideselector.component';

@NgModule({
  declarations: [TotemSideselectorComponent],
  imports: [SharedModule, RouterModule, MatIconModule, MatRippleModule],
  exports: [TotemSideselectorComponent],
})
export class TotemSideselectorModule {}
