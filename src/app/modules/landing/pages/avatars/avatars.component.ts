import { Component, Input, OnDestroy, OnInit, } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
    selector: 'app-avatars',
    templateUrl: './avatars.component.html',
    styleUrls: ['./avatars.component.scss'],
    host: {
        class: 'px-[20px] lg:pt-[40px]'
    }
})
export class AvatarsComponent implements OnInit, OnDestroy {

  constructor(private assetsService: AssetsService) {}

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    this.getAssets();
  }

  getAssets() {
    this.assetsService.updateAssets('avatar', 1, 'newest').subscribe();
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
      })
  }
  onLoadMore(page: number) {
    this.assetsService.updateAssets('avatar', page, 'newest').subscribe();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.assetsService.reset();
  }
}
