import { NgModule } from '@angular/core';

import { TotemEventCounterComponent } from './totem-event-counter.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TotemButtonModule } from '../../../../../../components/utils/totem-button/totem-button.module';
import { SharedModule } from '@app/shared/shared.module';
import { EventCardModule } from './event-card/event-card.module';
import { SliderWireframeModule } from '@app/modules/demo/slider-wireframe/slider-wireframe.module';

@NgModule({
  declarations: [
    TotemEventCounterComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    TotemButtonModule,
    SharedModule,
    CommonModule,

    EventCardModule,
    SliderWireframeModule
  ],
  exports: [
    TotemEventCounterComponent
  ],
  providers: [],
})
export class TotemEventCounterModule {}
