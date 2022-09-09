import { NgModule } from '@angular/core';
import { SvgSpear } from './spear-svg.component';
import { SvgSword } from './sword-svg.component';

@NgModule({
    declarations: [
        SvgSpear,
        SvgSword
    ],
    exports: [
        SvgSpear,
        SvgSword
    ]
})

export class SvgItemsModule {
    
}