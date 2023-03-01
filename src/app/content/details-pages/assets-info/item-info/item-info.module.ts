import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@app/shared/shared.module';
import { AssetDetailsModule } from '../../asset-details/asset-details.module';
import { AssetInfoModule } from '../asset-info.module';
import { ItemInfoComponent } from './item-info.component';
import { ItemInfoRoutes } from './item-info.routing';

@NgModule({
  declarations: [ItemInfoComponent],
  imports: [
    AssetDetailsModule,
    SharedModule,
    RouterModule.forChild(ItemInfoRoutes),
  ],
  exports: [ItemInfoComponent],
})
export class ItemInfoModule {}
