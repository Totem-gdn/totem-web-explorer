import { Component, OnDestroy, OnInit } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { CacheService } from '@app/core/services/cache.service';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'user-gems',
  templateUrl: './user-gems.component.html',
  styleUrls: ['./user-gems.component.scss']
})
export class UserGemsComponent implements OnInit, OnDestroy {

  constructor(private alchService: AlchemyService,
              private web3Service: Web3AuthService,
              private itemsService: TotemItemsService,
              private cacheService: CacheService) { }

  gems!: any[];
  subs = new Subject<void>();

  async ngOnInit() {
    // this.filters$();
    // this.fetchGems();
    this.getNfts();
  }

  // filters$() {
  //   this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
  //     this.fetchGems(filters);
  //   })
  // }

  // fetchGems(filters?: ItemParam[]) {
  //   this.itemsService.getGems$(filters).pipe(takeUntil(this.subs)).subscribe(gems => {
  //     this.gems = gems;
  //   })
  // }

  async getNfts() {
    const wallet = await this.web3Service.getAccounts();

    this.alchService.getNfts(wallet).subscribe((nfts: any[]) => {
      const gems: any[] = [];
      for(let nft of nfts) {
        nft.id.tokenId = parseInt(nft.id.tokenId);
        if(nft.contractMetadata.name === 'Gem') {
          gems.push(nft);
        }
      }
      this.gems = gems;
      console.log('gems', this.gems)
      this.cacheService.setItemCache('gem', this.gems.length);
    })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
