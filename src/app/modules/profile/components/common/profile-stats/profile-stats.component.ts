import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AssetsCache, TotalAssets } from '@app/core/models/interfaces/assets.modle';
import { CacheService } from '@app/core/services/assets/cache.service';
import { ProfileService } from '@app/core/services/profile.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileStatsComponent implements OnInit, OnDestroy{

  constructor(
    private profileService: ProfileService) { }

  _total = new BehaviorSubject<TotalAssets | undefined>(undefined);
  sub!: Subscription;

  @Input() type = '';
  @Input() total: number | undefined;

  ngOnInit() {
    this.sub = this.profileService.totalAssets$
    .subscribe(total => {
      let _total = this._total.getValue();
      if(this.type == 'item') _total = total.totalItems;
      if(this.type == 'avatar') _total = total.totalAvatars;
      if(this.type == 'gem') _total = total.totalGems;
      if(this.type == 'fav_item') _total = total.totalFavItems;
      if(this.type == 'fav_avatar') _total = total.totalFavAvatars;
      if(this.type == 'fav_gem') _total = total.totalFavGems;
      this._total.next(_total);
    })
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
