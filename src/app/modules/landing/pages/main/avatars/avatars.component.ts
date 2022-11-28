import { Component, OnDestroy, OnInit } from '@angular/core';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { Gtag } from 'angular-gtag';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-avatars',
  templateUrl: './avatars.component.html',
  styleUrls: ['./avatars.component.scss'],
  host: {
    class: 'px-[20px] lg:pt-[40px] min-h-[calc(100vh-70px)]'
  }
})
export class AvatarsComponent implements OnInit, OnDestroy {

  constructor(private assetsService: AssetsService, private gtag: Gtag) {
    this.gtag.event('page_view');
  }

  subs = new Subject<void>();
  avatars!: any[] | null;

  async ngOnInit() {
    this.updateAssets();
    this.assets$();
  }

  updateAssets() {
    this.assetsService.updateAssets('avatar', 1, 'newest').subscribe();
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
      })
  }

  assets$() {
    this.assetsService.avatars$
      .pipe(takeUntil(this.subs))
      .subscribe(avatars => {
        this.avatars = avatars;
      })
  }

  onSort(sortMethod: any) {
    this.assetsService.updateAssets('avatar', 1, sortMethod).subscribe();
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
