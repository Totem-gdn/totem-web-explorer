import { NgModule } from '@angular/core';

import { TotemExplorerVideoComponent } from './totem-explorer-video.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    TotemExplorerVideoComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    SharedModule,
  ],
  exports: [
    TotemExplorerVideoComponent
  ],
  providers: [],
})
export class TotemExplorerVideoModule {}
