import { Component, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-gems',
  templateUrl: './user-gems.component.html',
  styleUrls: ['./user-gems.component.scss'],
  host: {
    class: 'min-h-[calc(100vh-70px)]'
  }
})
export class UserGemsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }

  constructor(private assetsService: AssetsService,
    private cacheService: CacheService) { }

  subs = new Subject<void>();

  sortMethod = ASSET_PARAM_LIST.MY;
  assets!: AssetInfo[] | null;
  setAssets!: AssetInfo[];


  ngOnInit() {
    this.loadMoreAssets(1);
  }

  loadMoreAssets(page: number, list = this.sortMethod, reset: boolean = false) {
    this.assetsService.fetchAssets(ASSET_TYPE.ITEM, page, list).subscribe(assets => {
      if(reset) {
        this.setAssets = assets.data;
      } else {
        this.assets = assets.data;
      }
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMoreAssets(1, this.sortMethod);
  }

}
