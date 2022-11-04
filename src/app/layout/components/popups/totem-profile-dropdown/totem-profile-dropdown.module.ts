import { NgModule } from '@angular/core';

import { TotemNavSidebarComponent } from './totem-profile-dropdown.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { SnackNotifierService } from '@app/components/utils/snack-bar-notifier/snack-bar-notifier.service';
import { BalanceModule } from '../totem-nav-sidebar/balance/balance.module';
import { TotemButtonModule } from '@app/components/utils/totem-button/totem-button.module';
import { TotemSearchFilterModule } from '../../totem-navigation/totem-search-filter/totem-search-filter.module';

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
    ClipboardModule,

    BalanceModule,
  ],
  exports: [
    TotemNavSidebarComponent
  ],
  providers: [SnackNotifierService],
})
export class TotemProfSidebarModule {}
