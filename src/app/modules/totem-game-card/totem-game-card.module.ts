import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/shared.module';
import { TotemGameCardComponent } from './totem-game-card.component';

@NgModule({
  declarations: [TotemGameCardComponent],
  imports: [SharedModule, MatIconModule, RouterModule],
  exports: [TotemGameCardComponent],
})
export class TotemGameCardModule {}
