import { Component } from '@angular/core';
import { GAME_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { GamesService } from '@app/core/services/assets/games.service';
import { Subject, take, takeUntil } from 'rxjs';

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
  sortMethod = GAME_PARAM_LIST.LATEST;

  constructor(private gamesService: GamesService) {}

  ngOnInit(): void {
    this.loadMore(1);
  }

  loadMore(page: number, list = this.sortMethod) {
    this.gamesService.fetchGames(page, list)
      .pipe(take(1))
      .subscribe(games => {
      this.games = games;
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMore(1, this.sortMethod);
  }

}
