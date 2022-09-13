import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomePageComponent } from './components/totem-home-page.component';
import { TotemHomePageRouting } from './totem-home-page-routing.module';
import { SwiperModule } from 'swiper/angular';
import { SharedModule } from '@app/shared/shared.module';
import { TotemPromoGameModule } from '../components/home-components/totem-promo-game/totem-promo-game.module';
import { TotemMeetUsModule } from '../components/home-components/totem-meet-us/totem-meet-us.module';
import { TotemEmailSubModule } from '../components/home-components/totem-email-sub/totem-email-sub.module';
import { TotemEventCounterModule } from '../components/home-components/totem-event-counter/totem-event-counter.module';
import { ArrowsModule } from '../components/common-components/arrows/arrows.module';
import { ItemCardModule } from '../components/common-components/cards/item-card/item-card.module';
import { GameCardModule } from '../components/common-components/cards/game-card/game-card.module';
import { AvatarCardModule } from '../components/common-components/cards/avatar-card/avatar-card.module';
import { CarouselModule } from '../components/home-components/carousel/carousel.module';
import { TotemButtonModule } from '../components/common-components/totem-button/totem-button.module';
import { HomeWidgetModule } from '../components/home-components/home-widget/home-widget.module';
import { BackgroundCircleModule } from '../components/common-components/bg-circle/bg-circle.module';

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

    TotemPromoGameModule,
    TotemMeetUsModule,
    TotemEmailSubModule,
    TotemEventCounterModule,

    SharedModule,
    ArrowsModule,
    ItemCardModule,
    GameCardModule,
    AvatarCardModule,
    CarouselModule,
    HomeWidgetModule,

    BackgroundCircleModule,
    TotemButtonModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomePageModule {}
