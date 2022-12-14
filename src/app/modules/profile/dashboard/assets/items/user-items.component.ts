import { Component, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { PARAM_LIST } from '@app/core/models/enums/params.enum';
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

  constructor(private assetsService: AssetsService,
    private cacheService: CacheService) { }

  subs = new Subject<void>();
  items!: any[] | null;

  async ngOnInit() {
    this.getNfts();
  }

  getNfts() {
    this.assetsService.updateAssets(ASSET_TYPE.ITEM, 1, PARAM_LIST.MY).subscribe();
    this.assetsService.items$
      .pipe(takeUntil(this.subs))
      .subscribe(items => {
        this.items = items;
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets(ASSET_TYPE.ITEM, page, PARAM_LIST.MY).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }

}
