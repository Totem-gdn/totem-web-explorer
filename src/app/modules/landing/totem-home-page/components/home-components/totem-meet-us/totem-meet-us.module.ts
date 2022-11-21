import { NgModule } from '@angular/core';

import { TotemMeetUsComponent } from './totem-meet-us.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    TotemMeetUsComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    SharedModule,
  ],
  exports: [
    TotemMeetUsComponent
  ],
  providers: [],
})
export class TotemMeetUsModule {}
