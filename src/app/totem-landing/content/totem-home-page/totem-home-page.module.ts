import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomePageComponent } from './components/totem-home-page.component';
import { TotemHomePageRouting } from './totem-home-page-routing.module';
import { SwiperModule } from 'swiper/angular';
import { TotemPromoGameModule } from '@app/totem-landing/modules/totem-promo-game/totem-promo-game.module';
import { TotemMeetUsModule } from '@app/totem-landing/modules/totem-meet-us/totem-meet-us.module';
import { TotemFooterComponent } from '@app/totem-landing/components/totem-footer/totem-footer.component';
import { TotemEmailSubModule } from '@app/totem-landing/modules/totem-email-sub/totem-email-sub.module';
import { TotemEventCounterModule } from '@app/totem-landing/modules/totem-event-counter/totem-event-counter.module';

@NgModule({
  declarations: [
    TotemHomePageComponent,
    TotemFooterComponent
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
    TotemEventCounterModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomePageModule {}
