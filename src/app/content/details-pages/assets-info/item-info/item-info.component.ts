import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { Gtag } from 'angular-gtag';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'item-info',
  templateUrl: './item-info.component.html',
  host: {
    // class:'ml-auto mr-auto'
  },
})
export class ItemInfoComponent implements OnInit, OnDestroy {
  assetType: typeof ASSET_TYPE = ASSET_TYPE;
  item: any;
  subs = new Subject<void>();

  constructor(
    private assetsService: AssetsService,
    private route: ActivatedRoute,
    private gamesService: GamesService,
    private gtag: Gtag,
    private changeDetector: ChangeDetectorRef
  ) {
    this.gtag.event('page_view');
  }

  ngOnInit() {
    console.log('PARAMMMMMS');

    this.route.paramMap
      .pipe(takeUntil(this.subs))
      .subscribe((params: ParamMap) => {
        const id = params.get('id');
        if (!id) return;
        this.item = undefined;
        this.assetsService.fetchAsset(id, ASSET_TYPE.ITEM).subscribe({
          next: (item) => {
            this.item = item;
            console.log(this.item);
          },
          error: () => {
            this.item = null;
          },
        });
      });
    console.log('PARAMMMMMS');
  }
  ngAfterViewInit() {
    console.log('IT WORKS');
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

  getSelectedGame() {
    return this.gamesService.gameInSession;
  }
}
