import { NgModule } from '@angular/core';

import { TotemNavSidebarComponent } from './totem-profile-dropdown.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TotemButtonModule } from '../../common-components/totem-button/totem-button.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TotemSearchFilterModule } from '../../common-components/totem-search-filter/totem-search-filter.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';

@NgModule({
  declarations: [
    TotemNavSidebarComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    TotemButtonModule,
    MatIconModule,
    RouterModule,
    SharedModule,
    TotemSearchFilterModule,
    ClipboardModule
  ],
  exports: [
    TotemNavSidebarComponent
  ],
  providers: [SnackNotifierService],
})
export class TotemProfSidebarModule {}
