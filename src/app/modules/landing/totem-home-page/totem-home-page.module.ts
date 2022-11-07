import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomePageComponent } from './components/totem-home-page.component';
import { TotemHomePageRouting } from './totem-home-page-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '@app/shared/shared.module';
import { TotemPromoGameModule } from './components/home-components/totem-promo-game/totem-promo-game.module';
import { TotemMeetUsModule } from './components/home-components/totem-meet-us/totem-meet-us.module';
import { TotemEmailSubModule } from './components/home-components/totem-email-sub/totem-email-sub.module';
import { TotemEventCounterModule } from './components/home-components/totem-event-counter/totem-event-counter.module';
import { ArrowsModule } from '../../../components/utils/arrows/arrows.module';
import { GameCardModule } from '../../../components/common/cards/game-card/game-card.module';
import { TotemButtonModule } from '../../../components/utils/totem-button/totem-button.module';
import { HomeWidgetModule } from './components/home-components/home-widget/home-widget.module';
import { BackgroundCircleModule } from '../../../components/utils/bg-circle/bg-circle.module';
import { NgParticlesModule } from 'ng-particles';
import { RouterModule } from '@angular/router';
import { CardsModule } from '../../../components/common/cards/cards.module';
import { CarouselModule } from '@app/components/common/carousel/carousel.module';

@NgModule({
  declarations: [
    TotemHomePageComponent
  ],
  imports: [
    TotemHomePageRouting,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    SwiperModule,
    RouterModule,

    TotemPromoGameModule,
    TotemMeetUsModule,
    TotemEmailSubModule,
    TotemEventCounterModule,

    SharedModule,
    ArrowsModule,
    GameCardModule,
    CarouselModule,
    HomeWidgetModule,
    CardsModule,

    BackgroundCircleModule,
    TotemButtonModule,

    NgParticlesModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomePageModule {}
