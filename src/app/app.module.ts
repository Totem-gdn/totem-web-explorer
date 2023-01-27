import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';
import { LayoutModule } from './layout/layout.module';
import { UserStateService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/auth.interceptor';
import { GtagModule } from 'angular-gtag';
import { environment } from '@env/environment';
import { WelcomeDialogModule } from './core/dialogs/welcome-dialog/welcome-dialog.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { ServiceWorkerService } from './service-worker.service';
import { VersionDialogModule } from './core/dialogs/version-dialog/version-dialog.module';
import { PurchaseSuccessDialogModule } from './core/dialogs/purchase-success-dialog/purchase-success-dialog.module';


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
    GtagModule.forRoot({ trackingId: environment.TRACKING_G_ID, trackPageviews: true }),
    WelcomeDialogModule,
    VersionDialogModule,
    PurchaseSuccessDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
  }),
  ],
  providers: [
    UserStateService,
    AuthGuard,
    ServiceWorkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
