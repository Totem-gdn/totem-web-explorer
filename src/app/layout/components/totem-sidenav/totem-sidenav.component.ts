import { Component, OnInit } from '@angular/core';
import { GameDetail } from '@app/core/models/interfaces/submit-game-interface.model';
import { GamesStoreService } from '@app/core/store/games-store.service';
import { StoreService } from '@app/core/store/store.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Component({
  selector: 'totem-sidenav',
  templateUrl: './totem-sidenav.component.html',
  styleUrls: ['./totem-sidenav.component.scss'],

})
export class TotemSidenavComponent implements OnInit {

  selectedGame$: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  games$: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);

  constructor(private storeService: StoreService) {
  }

  ngOnInit(): void {
    this.storeService.selectedGame$.subscribe((game: GameDetail | null) => {
      this.selectedGame$.next(game);
      if (!game) return;
      this.selectGameLocally(game);
    });
    this.storeService.games$.subscribe((data: GameDetail[]) => {
      if (!data.length) return;
      const games = data.map((game: GameDetail, i: number) => {
        game.checked = false;
        if (i == 0) {
          game.checked = true;
          this.selectGame(game)
        }
        return game;
      });
      this.games$.next(games);
    });
  }

  selectGameLocally(gameToCheck: GameDetail) {
    this.games$.getValue().map((game: GameDetail) => {
      if (game.checked) {
        game.checked = false;
      }
      if (game.id == gameToCheck.id) {
        game.checked = true;
      }
      return game;
    });
  }

  selectGame(game: GameDetail) {
    this.games$.getValue().map((game: GameDetail) => {
      if (game.checked) {
        game.checked = false;
      }
      return game;
    });
    game.checked = true;
    this.storeService.selectGame(game);
  }

  trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

}
