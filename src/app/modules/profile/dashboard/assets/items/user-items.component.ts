import { Component, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss'],
  // host: {
  //   class: 'min-h-[calc(100vh-70px)]'
  // }
})
export class UserItemsComponent implements OnInit {
  get assetType() { return ASSET_TYPE };
  sortMethod = ASSET_PARAM_LIST.MY;

  constructor(private assetsService: AssetsService) { }

  subs = new Subject<void>();

  items!: AssetInfo[] | null;
  setItems!: AssetInfo[];


  ngOnInit() {
    this.loadMoreItems(1);
  }

  loadMoreItems(page: number, list = this.sortMethod, reset: boolean = false) {
    this.assetsService.fetchAssets(ASSET_TYPE.ITEM, page, list).subscribe(items => {
      if(reset) {
        this.setItems = items.data;
      } else {
        this.items = items.data;
      }
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMoreItems(1, this.sortMethod);
  }

}
