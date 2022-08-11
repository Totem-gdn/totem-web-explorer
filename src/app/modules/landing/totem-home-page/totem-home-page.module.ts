import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomePageComponent } from './components/totem-home-page.component';
import { TotemHomePageRouting } from './totem-home-page-routing.module';
import { SwiperModule } from 'swiper/angular';
import { TotemEmailSubModule } from '../modules/totem-email-sub/totem-email-sub.module';
import { TotemEventCounterModule } from '../modules/totem-event-counter/totem-event-counter.module';
import { TotemMeetUsModule } from '../modules/totem-meet-us/totem-meet-us.module';
import { TotemPromoGameModule } from '../modules/totem-promo-game/totem-promo-game.module';
import { SharedModule } from '@app/shared/shared.module';
import { ArrowsModule } from '../components/arrows/arrows.module';
import { AvatarCardModule } from '../components/cards/avatar-card/avatar-card.module';
import { CarouselModule } from '../components/carousel/carousel.module';
import { GameCardModule } from '../components/cards/game-card/game-card.module';
import { ItemCardModule } from '../components/cards/item-card/item-card.module';

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
    CarouselModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomePageModule {}
