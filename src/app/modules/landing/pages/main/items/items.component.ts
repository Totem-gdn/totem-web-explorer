import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { Gtag } from "angular-gtag";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  host: {
    class: 'px-[20px] lg:pt-[40px] min-h-[calc(100vh-70px)]'
  }
})

export class ItemsComponent implements OnDestroy {
  get assetType() { return ASSET_TYPE }

  constructor(
    private assetsService: AssetsService,
    private gtag: Gtag,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute
  ) {
    this.gtag.event('page_view');
  }

  items!: AssetInfo[] | null;
  setItems!: AssetInfo[] | null;

  subs = new Subject<void>();
  sortMethod = ASSET_PARAM_LIST.LATEST;
  filter?: string;

  ngOnInit() {
    this.params$();
  }

  params$() {
    this.route.queryParams
      .pipe(takeUntil(this.subs))
      .subscribe(params => {
        const filter = params['query'];
        this.filter = filter;
        this.loadMore(1, this.sortMethod, true);
      })
  }

  loadMore(page: number, list = this.sortMethod, reset: boolean = false) {
    if(this.filter) {
      this.assetsService.getAssetsByFilter(ASSET_TYPE.AVATAR, this.filter, page, this.sortMethod).subscribe(items => {
        if(reset) {
          this.setItems = items;
        } else {
          this.items = items;
        }
      });
    } else {
      this.assetsService.fetchAssets(ASSET_TYPE.ITEM, page, list).subscribe(items => {
        if(reset) {
          this.setItems = items.data;
        } else {
          this.items = items.data;
        }
      });
    }
  }

  onReset() {
    this.setItems = null;
    this.loadMore(1, this.sortMethod, true);
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMore(1, this.sortMethod, true);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
