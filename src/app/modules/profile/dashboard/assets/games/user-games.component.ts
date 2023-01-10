import { Component } from '@angular/core';
import { GAME_PARAM_LIST } from '@app/core/models/enums/params.enum';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { GamesService } from '@app/core/services/assets/games.service';
import { Web3AuthService } from '@app/core/web3auth/web3auth.service';
import { Gtag } from 'angular-gtag';
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
  games: GameDetail[] | undefined  | null;
  setGames: GameDetail[] | undefined | null;

  sortMethod = GAME_PARAM_LIST.LATEST;

  constructor(private gamesService: GamesService,
              private gtag: Gtag,
              private web3Service: Web3AuthService) {
    this.gtag.event('page_view');
  }

  async ngOnInit() {
    this.loadMore(1, this.sortMethod, true);
  }

  async loadMore(page: number, list = this.sortMethod, reset: boolean = false) {

    const wallet = await this.web3Service.getAccounts();

    this.gamesService.fetchGames(page, list, wallet).subscribe(games => {
      if(reset) {
        this.setGames = games.data;
      } else {
        this.games = games.data;
      }
    });
  }

  onSort(sortMethod: any) {
    this.sortMethod = sortMethod;
    this.loadMore(1, this.sortMethod, true);
  }
}
