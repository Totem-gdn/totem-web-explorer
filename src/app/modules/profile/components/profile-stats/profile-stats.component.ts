import { Component, Input, OnDestroy } from '@angular/core';
import { CacheService } from '@app/core/services/assets/cache.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'totem-profile-stats',
  templateUrl: './profile-stats.component.html',
  styleUrls: ['./profile-stats.component.scss'],
  host: {
    class: 'flex'
  }
})
export class ProfileStatsComponent {

  constructor(
    private cacheService: CacheService) { }

  _total = new BehaviorSubject<number | string | undefined>('--');
  _rare = new BehaviorSubject<number | string | undefined>('--');
  _unique = new BehaviorSubject<number | string | undefined>('--');

  @Input() type = '';
  @Input() total: number | undefined;

  ngOnInit() {
    this.cacheService.totalCache$().subscribe(total => {
      if (this.type == 'avatar') {
        this._total.next(total.totalAvatars);
        this._rare.next(total.totalRareAvatars);
        this._unique.next(total.totalUniqueAvatars);
      }
      if (this.type == 'item') {
        this._total.next(total.totalItems);
        this._rare.next(total.totalRareItems);
        this._unique.next(total.totalUniqueItems);
      }
      if (this.type == 'gem') {
        this._total.next(total.totalGems);
        this._rare.next(total.totalRareGems);
        this._unique.next(total.totalUniqueGems);
      }
      if (this.type == 'game') this._total.next(total.totalGames);
      if (this.type == 'fav_avatar') this._total.next(total.fav_totalAvatars);
      if (this.type == 'fav_item') this._total.next(total.fav_totalItems);
      if (this.type == 'fav_gem') this._total.next(total.fav_totalGems);
      if (this.type == 'fav_game') this._total.next(total.fav_totalGames);
    })
  }

}
