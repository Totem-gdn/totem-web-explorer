import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TotemSearchBarComponent } from './totem-search-bar.component';


@NgModule({
  declarations: [
    TotemSearchBarComponent
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
    TotemSearchBarComponent
  ],
  providers: [],
})
export class TotemSearchBarModule {}
