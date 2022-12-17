import { Component } from '@angular/core';
import { GAME_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { GamesService } from '@app/core/services/assets/games.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-user-games',
  templateUrl: './user-games.component.html',
  styleUrls: ['./user-games.component.scss'],
  // host: {
  //   class: 'min-h-[calc(100vh-70px)]'
  // }
})
export class UserGamesComponent {
  games!: any[] | undefined | null;
  subs = new Subject<void>();

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadMore(1, GAME_PARAM_LIST.LATEST);
  }

  loadMore(page: number, filters: GAME_PARAM_LIST = GAME_PARAM_LIST.LATEST) {
    this.gamesService.fetchGames(page, filters)
      .pipe(takeUntil(this.subs))
      .subscribe(games => {
        this.games = games;
      })
  }

  ngOnDestroy(): void {
    this.subs.next();
    this.subs.complete();
  }

}
