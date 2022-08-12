import { NgModule } from '@angular/core';

import { TotemPromoGameComponent } from './totem-promo-game.component';
// packages
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    TotemPromoGameComponent
  ],
  imports: [
    FlexLayoutModule,
    MatButtonModule
  ],
  exports: [
    TotemPromoGameComponent
  ],
  providers: [],
})
export class TotemPromoGameModule {}
