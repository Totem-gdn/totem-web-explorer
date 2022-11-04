import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, Subject, Subscription, take, takeUntil } from 'rxjs';
import { CARD_TYPE } from '@app/core/models/enums/card-types.enum';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';

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
    private web3Service: Web3AuthService,
    private cacheService: CacheService) { }

  subs = new Subject<void>();
  items!: any[] | null;

  async ngOnInit() {
    this.getNfts();
  }

  getNfts() {
    this.assetsService.updateAssets('item', 1, 'my').subscribe();
    this.assetsService.items$
      .pipe(takeUntil(this.subs))
      .subscribe(items => {
        this.items = items;
        if(!this.items) return;
        this.cacheService.totalByAssetType('item', this.items);
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets('item', page, 'my').subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }

}
