import { NgModule } from '@angular/core';

import { TotemMeetUsComponent } from './totem-meet-us.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TotemMeetUsComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [
    TotemMeetUsComponent
  ],
  providers: [],
})
export class TotemMeetUsModule {}
