import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { TotemSearchFilterComponent } from './components/totem-search-filter.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';


@NgModule({
  declarations: [
    TotemSearchFilterComponent
  ],
  imports: [
    SharedModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatIconModule,
    CommonModule,
    RouterModule
  ],
  exports: [
    TotemSearchFilterComponent
  ],
  providers: [],
})
export class TotemSearchFilterModule {}
