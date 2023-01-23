import { NgModule } from '@angular/core';
import { SafePipe } from './safe-url.pipe';

@NgModule({
    declarations: [
        SafePipe
    ],
    exports     : [
        SafePipe
    ]
})
export class SafeUrlPipeModule
{
}
