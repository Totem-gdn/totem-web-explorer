import { Component, Input, OnDestroy, } from '@angular/core';
import { ItemParam } from '@app/core/models/item-param.model';
import { TotemItemsService } from '@app/core/services/totem-items.service';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  host: {
      class: 'px-[20px] lg:pt-[40px]'
  }
})
export class GamesComponent implements OnDestroy {
  games!: any[];
  subs = new Subject<void>();

  constructor(private itemsService: TotemItemsService) {}

  ngOnInit(): void {
    this.fetchGames();
    this.filters$();
  }

  filters$() {
    this.itemsService.filters$.pipe(takeUntil(this.subs)).subscribe(filters => {
      this.fetchGames(filters);
    })
  }

  fetchGames(filters?: ItemParam[]) {
    this.itemsService.getGames$(filters).pipe(takeUntil(this.subs)).subscribe(games => {
      this.games = games;
    })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
