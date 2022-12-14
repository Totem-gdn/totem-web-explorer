import { Component, OnDestroy, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { PARAM_LIST } from '@app/core/models/enums/params.enum';
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
export class UserGemsComponent implements OnInit, OnDestroy {

  constructor(private assetsService: AssetsService,
    private cacheService: CacheService) { }

  subs = new Subject<void>();
  gems!: any[] | null;

  async ngOnInit() {
    this.getNfts();
  }

  getNfts() {
    this.assetsService.updateAssets(ASSET_TYPE.GEM, 1, PARAM_LIST.MY).subscribe();
    this.assetsService.gems$
      .pipe(takeUntil(this.subs))
      .subscribe(gems => {
        this.gems = gems;
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets(ASSET_TYPE.GEM, page, PARAM_LIST.MY).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();

  }

}
