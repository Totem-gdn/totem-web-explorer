import { NgModule } from '@angular/core';

import { TotemPromoGameComponent } from './totem-promo-game.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { TotemButtonModule } from '../../../../../../components/utils/totem-button/totem-button.module';

@NgModule({
  declarations: [
    TotemPromoGameComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule,
    TotemButtonModule
  ],
  exports: [
    TotemPromoGameComponent
  ],
  providers: [],
})
export class TotemPromoGameModule {}
