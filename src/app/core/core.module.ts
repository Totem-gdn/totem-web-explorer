import { NgModule } from '@angular/core';
import { AuthModule } from './auth/auth.module';
import { IconsModule } from './icons/icons.module';
import { LoadingModule } from './services/loading/loading.module';
import { SplashScreenModule } from './services/splash-loading/splash-screen.module';

@NgModule({
    imports: [
        AuthModule,
        IconsModule,
        LoadingModule,
        SplashScreenModule,
    ]
})
export class CoreModule
{
}
