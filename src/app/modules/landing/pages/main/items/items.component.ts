import { Component, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ASSET_TYPE } from "@app/core/models/enums/asset-types.enum";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
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

  constructor(
    private assetsService: AssetsService,
    private gtag: Gtag,
    private activatedRoute: ActivatedRoute,
  ) {
    this.gtag.event('page_view');
  }

  subs = new Subject<void>();
  items!: any[] | null;

  async ngOnInit() {
    this.updateAssets();
    this.assets$();
  }

  updateAssets() {
    this.assetsService.updateAssets(ASSET_TYPE.ITEM, 1, ASSET_PARAM_LIST.LATEST).subscribe(() => {
    });
    this.assetsService.items$
      .pipe(takeUntil(this.subs))
      .subscribe(items => {
        this.items = items;
      })
  }

  assets$() {
    this.assetsService.items$
      .pipe(takeUntil(this.subs))
      .subscribe(items => {

        this.items = items;
      })
  }

  onSort(sortMethod: any) {
    this.assetsService.updateAssets(ASSET_TYPE.ITEM, 1, sortMethod).subscribe();
  }

  onLoadMore(page: number) {
    this.assetsService.updateAssets(ASSET_TYPE.ITEM, page, ASSET_PARAM_LIST.LATEST).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }
}
