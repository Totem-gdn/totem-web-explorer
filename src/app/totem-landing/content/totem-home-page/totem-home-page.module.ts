import { NgModule } from '@angular/core';
import { TotemHomePageComponent } from './components/totem-home-page.component';
import { TotemHomePageRouting } from './totem-home-page-routing.module';

@NgModule({
  declarations: [
    TotemHomePageComponent
  ],
  imports: [
    TotemHomePageRouting
  ],
  exports: [],
  providers: [],
})
export class TotemHomePageModule {}
