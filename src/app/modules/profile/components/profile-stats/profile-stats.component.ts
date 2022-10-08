import { Component, Input, OnDestroy } from '@angular/core';
import { CacheService } from '@app/core/services/cache.service';
import { AlchemyService } from '@app/core/services/crypto/alchemy-api.service';
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

  constructor(private alchService: AlchemyService,
    private cacheService: CacheService) { }

  _total = new BehaviorSubject<number | string | undefined>('--');

  @Input() type = '';
  @Input() total: number | undefined;

  ngOnInit() {
    this.cacheService.totalCache$().subscribe(total => {
      console.log(total);
      if (this.type == 'avatar') this._total.next(total.totalAvatars);
      if (this.type == 'item') this._total.next(total.totalItems);
      if (this.type == 'gem') this._total.next(total.totalGems);
      if (this.type == 'game') this._total.next(total.totalGames);
      if (this.type == 'fav_avatar') this._total.next(total.fav_totalAvatars);
      if (this.type == 'fav_item') this._total.next(total.fav_totalItems);
      if (this.type == 'fav_gem') this._total.next(total.fav_totalGems);
      if (this.type == 'fav_game') this._total.next(total.fav_totalGames);
    })
  }

}
