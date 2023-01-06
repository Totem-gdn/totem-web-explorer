import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GAME_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
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

  constructor(private gamesService: GamesService,
    private gtag: Gtag,
    private route: ActivatedRoute) {
    this.gtag.event('page_view');
  }

  games: GameDetail[] | undefined | null;
  setGames: GameDetail[] | undefined | null;

  subs = new Subject<void>();
  sortMethod = GAME_PARAM_LIST.LATEST;
  filter?: string;

  // loadMore(page: number, list = this.sortMethod, reset: boolean = false) {
  //   this.gamesService.fetchGames(page, list).subscribe(games => {
  //     if(reset) {
  //       this.setGames = games;
  //     } else {
  //       this.games = games;
  //     }
  //   });
  // }

  ngOnInit() {
    this.params$();
  }

  params$() {
    this.route.queryParams
      .pipe(takeUntil(this.subs))
      .subscribe(params => {
        const filter = params['query'];
        this.filter = filter;
        this.loadMore(1, this.sortMethod, true);
      })
  }

  loadMore(page: number, list = this.sortMethod, reset: boolean = false) {
    if (this.filter) {
      this.gamesService.getGamesByFilter(this.filter, page, this.sortMethod).subscribe(games => {
        if (reset) {
          this.setGames = games;
        } else {
          this.games = games;
        }
      });
    } else {
      this.gamesService.fetchGames(page, list).subscribe(games => {
        if (reset) {
          this.setGames = games;
        } else {
          this.games = games;
        }
      });
    }
  }

  onReset() {
    this.setGames = null;
    this.loadMore(1, this.sortMethod, true);
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMore(1, this.sortMethod, true);
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }
}
