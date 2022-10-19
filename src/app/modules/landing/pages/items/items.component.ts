import { Component, Input, OnDestroy, } from "@angular/core";
import { ItemParam } from "@app/core/models/item-param.model";
import { AssetsService } from "@app/core/services/assets/assets.service";
import { TotemItemsService } from "@app/core/services/totem-items.service";
import { Gtag } from "angular-gtag";
import { Subject, Subscription, take, takeUntil } from "rxjs";

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  host: {
    class: 'px-[20px] lg:pt-[40px]'
  }
})

export class ItemsComponent implements OnDestroy {

  constructor(private assetsService: AssetsService, private gtag: Gtag) {
    gtag.event('page_view');
  }

  subs = new Subject<void>();
  items!: any[] | null;

  async ngOnInit() {
    this.getAssets();
  }

  getAssets() {
    this.assetsService.updateAssets('item', 1, 'newest').subscribe();
    this.assetsService.items$
      .pipe(takeUntil(this.subs))
      .subscribe(items => {
        this.items = items;
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets('item', page, 'newest').subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }
}
