import { Component, OnDestroy, OnInit } from '@angular/core';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { ItemParam } from '@app/core/models/item-param.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
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

  constructor(private assetsService: AssetsService,
    private alchService: AlchemyService,
    private web3Service: Web3AuthService) { }

  subs = new Subject<void>();
  gems!: any[] | null;

  async ngOnInit() {
    this.getNfts();
  }

  getNfts() {
    this.assetsService.updateAssets('gem', 1, 'my').subscribe();
    this.assetsService.gems$
      .pipe(takeUntil(this.subs))
      .subscribe(gems => {
        this.gems = gems;
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets('gem', page, 'my').subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();

  }

}
