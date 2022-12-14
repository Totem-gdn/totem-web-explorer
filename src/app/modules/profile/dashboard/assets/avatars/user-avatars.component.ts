import { Component, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { PARAM_LIST } from '@app/core/models/enums/params.enum';
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
export class UserAvatarsComponent implements OnInit, OnDestroy {

  constructor(
    private assetsService: AssetsService,
    private cacheService: CacheService
  ) { }

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    this.updateAssets();
  }

  updateAssets() {
    this.assetsService.updateAssets(ASSET_TYPE.AVATAR, 1, PARAM_LIST.MY).subscribe();
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
      })
  }

  onLoadMore(page: number) {
    this.assetsService.updateAssets(ASSET_TYPE.AVATAR, page, PARAM_LIST.MY).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }
}
