import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TotemHomePageComponent } from './components/totem-home-page.component';
import { TotemHomePageRouting } from './totem-home-page-routing.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [
    TotemHomePageComponent
  ],
  imports: [
    TotemHomePageRouting,
    MatButtonModule,
    FlexLayoutModule,
    MatIconModule,
    SwiperModule
  ],
  exports: [],
  providers: [],
})
export class TotemHomePageModule {}
