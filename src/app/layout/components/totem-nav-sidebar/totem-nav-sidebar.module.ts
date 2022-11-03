import { NgModule } from '@angular/core';

import { TotemNavSidebarComponent } from './totem-nav-sidebar.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TotemButtonModule } from '../../../modules/landing/components/common-components/totem-button/totem-button.module';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { TotemSearchFilterModule } from '../../../modules/landing/components/common-components/totem-search-filter/totem-search-filter.module';
import {ClipboardModule} from '@angular/cdk/clipboard';
import { SnackNotifierModule } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.module';
import { SnackNotifierService } from '@app/modules/landing/modules/snack-bar-notifier/snack-bar-notifier.service';
import { BalanceModule } from './balance/balance.module';

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
    SnackNotifierModule,

    BalanceModule,
  ],
  exports: [
    TotemNavSidebarComponent
  ],
  providers: [SnackNotifierService],
})
export class TotemNavSidebarModule {}
