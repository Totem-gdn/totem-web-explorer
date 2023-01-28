import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomepageRouting } from './totem-homepage-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TotemHomepageComponent } from './totem-homepage.component';
import { TotemStartScreenCardsModule } from '@app/modules/totem-start-screen-cards/totem-start-screen-cards.module';
import { TotemEntitySliderModule } from '@app/modules/totem-entity-slider/totem-entity-slider.module';
import { TotemEventCounterModule } from '@app/modules/landing/totem-home-page/components/home-components/totem-event-counter/totem-event-counter.module';
import { TotemPromoGameModule } from '@app/modules/landing/totem-home-page/components/home-components/totem-promo-game/totem-promo-game.module';
import { TotemExplorerVideoModule } from '@app/modules/totem-explorer-video/totem-explorer-video.module';
import { SliderWireframeModule } from '@app/modules/demo/slider-wireframe/slider-wireframe.module';

@NgModule({
  declarations: [TotemHomepageComponent],
  imports: [
    TotemHomepageRouting,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SharedModule,
    TotemStartScreenCardsModule,
    TotemEntitySliderModule,
    TotemEventCounterModule,
    TotemPromoGameModule,
    TotemExplorerVideoModule,

    SliderWireframeModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomepageModule {}
