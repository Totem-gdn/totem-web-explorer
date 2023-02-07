import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TotemBuyAssetComponent } from './buy-asset.component';

const routes: Routes = [
    {
        path: '',
        component: TotemBuyAssetComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [
        RouterModule,
    ],
})
export class TotemBuyAssetRouting {
}
