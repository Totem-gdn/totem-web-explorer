import { NgModule } from '@angular/core';

// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { TotemButtonComponent } from './totem-button.component';
import {MatRippleModule} from '@angular/material/core';

@NgModule({
  declarations: [
    TotemButtonComponent
  ],
  imports: [
    FlexLayoutModule,
    MatRippleModule
  ],
  exports: [
    TotemButtonComponent
  ],
  providers: [],
})
export class TotemButtonModule {}
