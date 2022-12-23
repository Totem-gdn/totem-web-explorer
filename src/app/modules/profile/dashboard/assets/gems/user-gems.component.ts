import { Component, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
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
  gems!: any[] | null;

  ngOnInit() {
    this.loadMoreGems(1);
  }

  loadMoreGems(page: number) {
    this.assetsService.fetchAssets(ASSET_TYPE.GEM, page, ASSET_PARAM_LIST.MY).subscribe(gems => {
      // this.gems = gems;
      if(gems.data) {
        this.gems = gems.data;
        return;
      }
      this.gems = (gems as any);
    });
  }

}
