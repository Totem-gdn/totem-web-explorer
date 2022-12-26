import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { ASSET_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { AssetInfo } from '@app/core/models/interfaces/asset-info.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { Gtag } from 'angular-gtag';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
  host: {
    class: 'px-[20px] lg:pt-[40px] min-h-[calc(100vh-70px)]'
  }
})
export class AvatarsComponent implements OnInit {
  get assetType() { return ASSET_TYPE }

  constructor(
    private assetsService: AssetsService,
    private gtag: Gtag,
    private activatedRoute: ActivatedRoute,
  ) {
    this.gtag.event('page_view');
  }


  avatars!: any[] | null;
  setAvatars!: AssetInfo[] | null;

  sortMethod = ASSET_PARAM_LIST.LATEST;
  total?: number;

  subs = new Subject<void>();

  ngOnInit() {
    this.loadMoreAvatars(1);
  }

  onReset() {
    this.setAvatars = null;
    this.loadMoreAvatars(1, this.sortMethod, true);
  }

  loadMoreAvatars(page: number, list = this.sortMethod, reset: boolean = false) {
    this.assetsService.fetchAssets(ASSET_TYPE.AVATAR, page, list).subscribe(avatars => {
      // this.total = avatars.meta.total;
      

      if(reset) {
        this.setAvatars = avatars.data;
      } else {
        this.avatars = avatars.data;
      }
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMoreAvatars(1, this.sortMethod);
  }
}
