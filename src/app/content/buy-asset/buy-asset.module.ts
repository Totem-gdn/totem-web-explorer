import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemBuyAssetRouting } from './buy-asset.routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TotemBuyAssetComponent } from './buy-asset.component';
import { TotemStartScreenCardsModule } from '@app/modules/totem-start-screen-cards/totem-start-screen-cards.module';
import { TotemEntitySliderModule } from '@app/modules/totem-entity-slider/totem-entity-slider.module';
import { TotemEventCounterModule } from '@app/modules/landing/totem-home-page/components/home-components/totem-event-counter/totem-event-counter.module';
import { TotemPromoGameModule } from '@app/modules/landing/totem-home-page/components/home-components/totem-promo-game/totem-promo-game.module';
import { TotemExplorerVideoModule } from '@app/modules/totem-explorer-video/totem-explorer-video.module';
import { MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [TotemBuyAssetComponent],
  imports: [
    TotemBuyAssetRouting,
    MatButtonModule,
    MatRippleModule,
    MatIconModule,
    RouterModule,
    SharedModule,
    TotemStartScreenCardsModule,
    TotemEntitySliderModule,
    TotemEventCounterModule,
    TotemPromoGameModule,
    TotemExplorerVideoModule
  ],
  exports: [],
  providers: [],
})
export class TotemBuyAssetModule {}
