import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { CoreModule } from './core/core.module';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { UserStateService } from './core/services/user-state.service';
import { AuthGuard } from './core/guards/auth.guard';


const routerConfig: ExtraOptions = {
  preloadingStrategy       : PreloadAllModules,
  // scrollPositionRestoration: 'enabled',
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes, routerConfig),
    LayoutModule,
    CoreModule,
  ],
  providers: [UserStateService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
