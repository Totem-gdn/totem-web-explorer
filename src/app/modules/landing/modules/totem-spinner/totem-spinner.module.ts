import { NgModule } from '@angular/core';

import { TotemSpinnerComponent } from './totem-spinner.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TotemSpinnerComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [
    TotemSpinnerComponent
  ],
  providers: [],
})
export class TotemSpinnerModule {}
