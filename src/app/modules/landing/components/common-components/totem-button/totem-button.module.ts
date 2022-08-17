import { NgModule } from '@angular/core';

// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { TotemButtonComponent } from './totem-button.component';

@NgModule({
  declarations: [
    TotemButtonComponent
  ],
  imports: [
    FlexLayoutModule,
  ],
  exports: [
    TotemButtonComponent
  ],
  providers: [],
})
export class TotemButtonModule {}
