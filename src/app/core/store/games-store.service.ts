import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { ApiResponse } from "../models/interfaces/api-response.interface";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";
import { GamesService } from "../services/assets/games.service";






////// TO DELETE






@Injectable({ providedIn: 'root' })

export class GamesStoreService {

  private selectedGame: BehaviorSubject<GameDetail | null> = new BehaviorSubject<GameDetail | null>(null);
  selectedGame$: Observable<GameDetail | null> = this.selectedGame.asObservable();

  private games: BehaviorSubject<GameDetail[]> = new BehaviorSubject<GameDetail[]>([]);
  games$: Observable<GameDetail[]> = this.games.asObservable();

  constructor(private gamesService: GamesService) {}

  selectGame(game: GameDetail) {
    this.selectedGame.next(game);
  }

  getGames(page: number = 1) {
    this.gamesService.fetchGames(page).subscribe((games: ApiResponse<GameDetail[]>) => {
      this.games.next(games.data);
    })
  }

}
