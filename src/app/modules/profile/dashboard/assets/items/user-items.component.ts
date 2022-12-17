import { Component, OnInit } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
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

  constructor(private assetsService: AssetsService) { }

  subs = new Subject<void>();
  items!: any[] | null;

  ngOnInit() {
    this.loadMoreItems(1);
  }

  loadMoreItems(page: number) {
    this.assetsService.fetchAssets(ASSET_TYPE.ITEM, page, ASSET_PARAM_LIST.MY).subscribe(items => {
      if(items.data) {
        this.items = items.data;
        return;
      }
      this.items = (items as any);
    });
  }

}
