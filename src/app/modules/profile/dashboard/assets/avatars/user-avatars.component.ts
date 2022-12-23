import { Component, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss'],
  // host: {
  //   class: 'pb-[60px]'
  // }
})
export class UserAvatarsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }

  constructor(
    private assetsService: AssetsService,
    private cacheService: CacheService
  ) { }

  subs = new Subject<void>();
  avatars!: any[] | null;

  ngOnInit() {
    this.loadMoreAvatars(1);
  }

  loadMoreAvatars(page: number) {
    this.assetsService.fetchAssets(ASSET_TYPE.AVATAR, page, ASSET_PARAM_LIST.MY).subscribe(avatars => {
      if(avatars.data) {
        this.avatars = avatars.data;
        return;
      }
      this.avatars = (avatars as any);
    });
  }
}
