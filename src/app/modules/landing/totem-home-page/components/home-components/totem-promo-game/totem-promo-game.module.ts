import { NgModule } from '@angular/core';

import { TotemPromoGameComponent } from './totem-promo-game.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TotemButtonModule } from '../../../../../../components/utils/totem-button/totem-button.module';
import { SharedModule } from '@app/shared/shared.module';

@NgModule({
  declarations: [
    TotemPromoGameComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    SharedModule,
    TotemButtonModule
  ],
  exports: [
    TotemPromoGameComponent
  ],
  providers: [],
})
export class TotemPromoGameModule {}
