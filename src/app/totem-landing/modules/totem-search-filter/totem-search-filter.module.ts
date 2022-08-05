import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TotemSearchFilterComponent } from './components/totem-search-filter.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    TotemSearchFilterComponent
  ],
  imports: [
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  exports: [
    TotemSearchFilterComponent
  ],
  providers: [],
})
export class TotemSearchFilterModule {}
