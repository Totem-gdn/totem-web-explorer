import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'user-gems',
  templateUrl: './user-gems.component.html',
  styleUrls: ['./user-gems.component.scss'],
  host: {
    class: 'min-h-[calc(100vh-70px)]'
  }
})
export class UserGemsComponent implements OnInit, OnDestroy {

  constructor(private assetsService: AssetsService,
    private cacheService: CacheService) { }

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
