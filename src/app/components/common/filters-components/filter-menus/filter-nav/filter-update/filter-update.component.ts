import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ASSET_TYPE } from '@app/core/models/enums/asset-types.enum';
import { APIResponseMeta } from '@app/core/models/interfaces/api-response.interface';
import { AssetsService } from '@app/core/services/assets/assets.service';
import { CacheService } from '@app/core/services/assets/cache.service';
import { BehaviorSubject, Subscription, takeUntil } from 'rxjs';

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

  constructor(private assetsService: AssetsService) {}

  @ViewChild('icon') icon!: ElementRef;
  @Output() updateEvent = new EventEmitter<void>();
  @Input() showUpdate = true;
  @Input() type!: ASSET_TYPE | 'game';

  sub!: Subscription;
  total!: string | undefined;

  ngOnInit() {
    this.sub = this.assetsService.totalAssets$
      .subscribe(total => {
        if(!total) return;
        if(this.type == ASSET_TYPE.AVATAR) {
          this.total = total?.avatars?.total?.toString();
        }
        if(this.type == ASSET_TYPE.ITEM) {
          this.total = total?.items?.total?.toString();
        }
      })
  }

  onClick() {
    this.icon.nativeElement.style.animation = 'none';
    this.icon.nativeElement.offsetHeight;

    this.icon.nativeElement.style.animation = 'rotate 0.5s';
    this.updateEvent.emit();
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
