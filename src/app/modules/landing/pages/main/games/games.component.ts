import { Component, EventEmitter, Input, OnDestroy, } from '@angular/core';
import { GamesService } from '@app/core/services/assets/games.service';
import { Gtag } from 'angular-gtag';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  host: {
    class: 'px-[20px] lg:pt-[40px] min-h-[calc(100vh-70px)]'
  }
})
export class GamesComponent implements OnDestroy {
  games: any[] | undefined  | null;

  subs = new Subject<void>();

  constructor(private gamesService: GamesService, private gtag: Gtag) {
    gtag.event('page_view');
  }

  ngOnInit(): void {
    this.updateGames();
    this.games$();
  }

  updateGames(filters: 'latest' | 'popular' = 'latest') {
    this.gamesService.updateGames(1, filters)
      .pipe(takeUntil(this.subs))
      .subscribe(games => {
        this.games = games;
      })
  }

  onLoadMore(page: number) {
    this.gamesService.updateGames(page, 'latest').subscribe();
  }

  games$() {
    this.gamesService.games$
      .pipe(takeUntil(this.subs))
      .subscribe(games => {
        this.games = games;
      })
  }

  onSort(sortMethod: any) {
    this.updateGames(sortMethod);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
    this.gamesService.clearGames();
  }
}
