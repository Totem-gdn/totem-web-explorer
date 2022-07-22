import { NgModule } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';

@NgModule({
    providers: [
        SplashScreenService
    ]
})
export class SplashScreenModule
{
    /**
     * Constructor
     */
    constructor(private splashScreenService: SplashScreenService)
    {
    }
}
