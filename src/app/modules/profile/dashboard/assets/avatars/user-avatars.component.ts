import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-avatars',
  templateUrl: './user-avatars.component.html',
  styleUrls: ['./user-avatars.component.scss'],
  // host: {
  //   class: 'pb-[60px]'
  // }
})
export class UserAvatarsComponent implements OnInit, OnDestroy {

  constructor(
    private assetsService: AssetsService,
    private cacheService: CacheService
  ) { }

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    this.updateAssets();
  }

  updateAssets() {
    this.assetsService.updateAssets('avatar', 1, 'my').subscribe();
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
        if (!this.avatars) return;
        this.cacheService.totalByAssetType('avatar', this.avatars);
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
