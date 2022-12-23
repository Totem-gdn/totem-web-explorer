import { Component, OnDestroy } from '@angular/core';
import { GAME_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { GamesService } from '@app/core/services/assets/games.service';
import { Gtag } from 'angular-gtag';
import { Subject, takeUntil } from 'rxjs';

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
  sortMethod = GAME_PARAM_LIST.LATEST;

  constructor(private gamesService: GamesService, private gtag: Gtag) {
    this.gtag.event('page_view');
  }

  ngOnInit(): void {
    this.loadMore(1);
  }

  loadMore(page: number, list = this.sortMethod) {
    this.gamesService.fetchGames(page, list).subscribe(games => {
      console.log(games)
      this.games = games;
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMore(1, this.sortMethod);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
