import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TotemEmailSubComponent } from './components/totem-email-sub.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TotemEmailSubComponent
  ],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    TotemEmailSubComponent
  ],
  providers: [],
})
export class TotemEmailSubModule {}
