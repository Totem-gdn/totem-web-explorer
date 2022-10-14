import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { CacheService } from '@app/core/services/assets/cache.service';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Subject, Subscription, take, takeUntil } from 'rxjs';
import { CARD_TYPE } from '@app/core/enums/card-types.enum';
import { AssetsService } from '@app/core/services/assets/assets.service';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss']
})
export class UserAvatarsComponent implements OnInit, OnDestroy {

  constructor(private web3Service: Web3AuthService,
    private alchService: AlchemyService,
    private assetsService: AssetsService) { }

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    this.getAssets();
  }

  getAssets() {
    this.assetsService.updateAssets('avatar', 1, 'my').subscribe();
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets('avatar', page, 'my').subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }
}
