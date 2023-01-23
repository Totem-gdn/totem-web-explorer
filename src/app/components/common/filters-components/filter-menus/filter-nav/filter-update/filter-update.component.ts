import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { APIResponseMeta } from '@app/core/models/interfaces/api-response.interface';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { GamesService } from '@app/core/services/assets/games.service';
import { BehaviorSubject, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'filter-update',
  templateUrl: './filter-update.component.html',
  styleUrls: ['./filter-update.component.scss'],
  host: {
    class: 'nav-item flex-none lg:w-[320px]'
  }
})

export class FilterUpdateComponent implements OnInit, OnDestroy {
  get assetType() { return ASSET_TYPE }

  constructor(private assetsService: AssetsService,
              private gamesService: GamesService) {}

  @ViewChild('icon') icon!: ElementRef;
  @Output() updateEvent = new EventEmitter<void>();
  @Input() showUpdate = true;
  @Input() type!: ASSET_TYPE | 'game';

  subs = new Subject<void>();
  total!: string | undefined;

  ngOnInit() {
    this.assetsService.totalAssets$
      .pipe(takeUntil(this.subs))
      .subscribe(total => {
        if(!total) return;
        if(this.type == ASSET_TYPE.AVATAR) {
          this.total = total?.avatars?.total?.toString();
        }
        if(this.type == ASSET_TYPE.ITEM) {
          this.total = total?.items?.total?.toString();
        }
      })
    this.gamesService.totalGames$
      .pipe(takeUntil(this.subs))
      .subscribe(total => {
        if(this.type == 'game') this.total = total?.toString();
      })
  }

  onClick() {
    this.icon.nativeElement.style.animation = 'none';
    this.icon.nativeElement.offsetHeight;

    this.icon.nativeElement.style.animation = 'rotate 0.5s';
    this.updateEvent.emit();
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
