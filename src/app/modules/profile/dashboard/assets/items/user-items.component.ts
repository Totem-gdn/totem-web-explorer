import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { CacheService } from '@app/core/services/cache.service';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { ItemsService } from '@app/core/services/assets/items.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { BehaviorSubject, Subject, Subscription, take, takeUntil } from 'rxjs';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { UserAssetsService } from '@app/core/services/assets/user-assets.service';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  constructor(private assetsService: UserAssetsService,
              private web3Service: Web3AuthService,
              private alchService: AlchemyService) { }

  // items!: any[];
  items!: any[] | null;
  subs = new Subject<void>();

  async ngOnInit() {
    // this.filters$();
    // this.fetchItems();
    // this.getItems();
    this.getNfts();
  }

  // getItems() {
  //   this.assetsService.updateAssets('item').subscribe();
  //   this.assetsService.items$
  //     .pipe(takeUntil(this.subs))
  //     .subscribe(items => {
  //       this.items = items;
  //     })
  // }

  // filters$() {
  //   this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
  //     this.fetchItems(filters);
  //   })
  // }

  // fetchItems(filters?: ItemParam[]) {
  //   this.itemsService.getItems$(filters).pipe(takeUntil(this.subs)).subscribe(items => {
  //     this.items = items;
  //   })
  // }

  async getNfts() {
    const wallet = await this.web3Service.getAccounts();

    this.alchService.getAssetsIds(CARD_TYPE.ITEM, wallet).then(items => {
      this.items = items;
    });
  }

  ngOnDestroy () {
    this.subs.next();
    this.subs.complete();
  }

}
