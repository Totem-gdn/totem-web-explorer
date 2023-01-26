import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomepageRouting } from './totem-homepage-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TotemHomepageComponent } from './totem-homepage.component';
import { TotemStartScreenCardsModule } from '@app/modules/totem-start-screen-cards/totem-start-screen-cards.module';
import { TotemAssetSliderModule } from '@app/modules/totem-asset-slider/totem-asset-slider.module';

@NgModule({
  declarations: [TotemHomepageComponent],
  imports: [
    TotemHomepageRouting,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    SharedModule,
    TotemStartScreenCardsModule,
    TotemAssetSliderModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomepageModule {}
