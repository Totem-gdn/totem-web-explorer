import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { CacheService } from '@app/core/services/cache.service';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { ItemsService } from '@app/core/services/items/items.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-items',
  templateUrl: './user-items.component.html',
  styleUrls: ['./user-items.component.scss']
})
export class UserItemsComponent implements OnInit {

  constructor(private itemsService: TotemItemsService,
              private web3Service: Web3AuthService,
              private alchService: AlchemyService,
              private cacheService: CacheService) { }

  items!: any[];
  subs = new Subject<void>();

  async ngOnInit() {
    // this.filters$();
    // this.fetchItems();
    this.getNfts();
  }

  async getNfts() {
    const wallet = await this.web3Service.getAccounts();

    this.alchService.getNfts(wallet).subscribe((nfts: any[]) => {
      const items: any[] = [];
      for(let nft of nfts) {
        nft.id.tokenId = parseInt(nft.id.tokenId);
        if(nft.contractMetadata.name === 'Item') {
          items.push(nft);
        }
      }
      this.items = items;
      console.log('items', this.items)
      this.cacheService.setItemCache('item', this.items.length);
    })
  }

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

  // async getNfts() {
  //   const wallet = await this.web3Service.getAccounts();

  //   this.alchService.getNfts(wallet).subscribe((nfts: any[]) => {
  //     const items: any[] = [];
  //     for(let nft of nfts) {
  //       nft.id.tokenId = parseInt(nft.id.tokenId);
  //       if(nft.contractMetadata.name === 'Item') {
  //         items.push(nft);
  //       }
  //     }
  //     this.items = items;
  //   })
  // }

  ngOnDestroy () {
    this.subs.next();
    this.subs.complete();
  }

}
