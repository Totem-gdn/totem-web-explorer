import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { TotemProfileDropdownComponent } from './totem-profile-dropdown.component';

@NgModule({
  declarations: [TotemProfileDropdownComponent],
  imports: [SharedModule, MatIconModule, ClipboardModule],
  exports: [TotemProfileDropdownComponent],
})
export class TotemProfileDropdownModule {}
