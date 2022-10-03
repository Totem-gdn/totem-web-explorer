import { Component, Input, OnDestroy } from '@angular/core';
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
export class ProfileStatsComponent implements OnDestroy {

  constructor(private alchService: AlchemyService) { }

  totalAvatars = new BehaviorSubject<number | string | undefined>('--');
  @Input() type = '';
  @Input() total: undefined | number;
  sub!: Subscription;
  
  ngOnInit() {
    this.alchService.totalItems.subscribe(total => {
      if (this.type == 'avatar') this.totalAvatars.next(total.totalAvatars);
      if (this.type == 'item') this.totalAvatars.next(total.totalItems);
      if (this.type == 'gem') this.totalAvatars.next(total.totalGems);
    })
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

}
