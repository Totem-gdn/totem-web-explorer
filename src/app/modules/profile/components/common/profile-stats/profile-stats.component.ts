import { Component, Input, OnInit } from '@angular/core';
import { AssetsCache, TotalAssets } from '@app/core/models/interfaces/assets.modle';
import { AccountMetaBody, UserCountAssetBody } from '@app/core/models/interfaces/user-interface.model';
import { CacheService } from '@app/core/services/assets/cache.service';
import { ProfileService } from '@app/core/services/profile.service';
import { OnDestroyMixin, untilComponentDestroyed } from '@w11k/ngx-componentdestroyed';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileStatsComponent extends OnDestroyMixin implements OnInit {

  constructor(
    private profileService: ProfileService) {
      super();
  }

  _total = new BehaviorSubject<UserCountAssetBody | undefined>(undefined);
  sub!: Subscription;

  @Input() type = '';
  @Input() total: number | undefined;

  ngOnInit() {

    this.sub = this.profileService.totalAssets$.pipe(
      untilComponentDestroyed(this)
      ).subscribe((accountMeta: AccountMetaBody) => {
        this.processAccountMetaData(accountMeta);
      });

  }

  processAccountMetaData(meta: AccountMetaBody) {
    if(this.type == 'item') {
      this._total.next(meta.own?.items);
    }
    if(this.type == 'avatar') {
      this._total.next(meta.own?.avatars);
    }
    if(this.type == 'gem') {
      this._total.next(meta.own?.gems);
    }
    if(this.type == 'fav_item') {
      this._total.next(meta.favorites?.items);
    }
    if(this.type == 'fav_avatar') {
      this._total.next(meta.favorites?.avatars);
    }
    if(this.type == 'fav_gem') {
      this._total.next(meta.favorites?.gems);
    }
  }

}
