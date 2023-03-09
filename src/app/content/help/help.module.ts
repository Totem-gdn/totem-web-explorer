import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { TotemHelpComponent } from './help.component';
import { TotemHelpRouting } from './help.routing.module';

@NgModule({
  declarations: [TotemHelpComponent],
  imports: [
    TotemHelpRouting,
    RouterModule,
    SharedModule,
  ],
  exports: [],
  providers: [],
})
export class TotemHelpModule {}
