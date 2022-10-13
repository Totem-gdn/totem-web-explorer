import { Component, OnDestroy, OnInit } from '@angular/core';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { ItemParam } from '@app/core/models/item-param.model';
import { UserAssetsService } from '@app/core/services/assets/user-assets.service';
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

  constructor(private assetsService: UserAssetsService,
              private alchService: AlchemyService,
              private web3Service: Web3AuthService) { }

  gems!: any[] | null;
  subs = new Subject<void>();

  async ngOnInit() {
    // this.filters$();
    // this.fetchGems();
    this.getNfts();
    // this.getGems();
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

  // getGems() {
  //   this.assetsService.updateAssets('gem').subscribe();
  //   this.assetsService.gems$
  //     .pipe(takeUntil(this.subs))
  //     .subscribe(gems => {
  //       this.gems = gems;
  //     })
  // }
  async getNfts() {
    const wallet = await this.web3Service.getAccounts();

    this.alchService.getAssetsIds(CARD_TYPE.GEM, wallet).then(gems => {
      this.gems = gems;
    });
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
