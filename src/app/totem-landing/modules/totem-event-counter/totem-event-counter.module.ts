import { NgModule } from '@angular/core';

import { TotemEventCounterComponent } from './totem-event-counter.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    TotemEventCounterComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,

    CommonModule
  ],
  exports: [
    TotemEventCounterComponent
  ],
  providers: [],
})
export class TotemEventCounterModule {}
