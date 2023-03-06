import { ClipboardModule } from '@angular/cdk/clipboard';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from 'app/shared/shared.module';
import { TotemProfileCoverComponent } from './totem-profile-cover.component';

@NgModule({
  declarations: [TotemProfileCoverComponent],
  imports: [SharedModule, MatIconModule, ClipboardModule],
  exports: [TotemProfileCoverComponent],
})
export class TotemProfileCoverModule {}
