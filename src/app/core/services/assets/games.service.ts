import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { environment } from "@env/environment";
import { BehaviorSubject, tap } from "rxjs";
import { BaseStorageService } from "../utils/base-storage.service";

@Injectable({ providedIn: 'root' })

export class GamesService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;
  private uniqSessionKey = 'gamesDropdown';

  constructor(
    private http: HttpClient,
    private baseStorageService: BaseStorageService,
    ) {
  }

  private _games = new BehaviorSubject<GameDetail[] | null>(null);
  private _game = new BehaviorSubject<GameDetail | null>(null);
  private _dropdownGames = new BehaviorSubject<GameDetail[] | null>(null);
  private _selectedGame = new BehaviorSubject<GameDetail | null>(null);

  private _lastDropdownFilter = new BehaviorSubject<string | null>(null);

  get games() { return this._games.getValue(); }
  get dropdownGames() { return this._dropdownGames.getValue() }

  set setGames(value: GameDetail[]) { this._games.next(value); }
  set setGame(value: any) { this._game.next(value); }
  set selectedGame(value: GameDetail) {
    if (value) {
      this._selectedGame.next(value);
    }
   }

  get games$() { return this._games.asObservable(); }
  get game$() { return this._game.asObservable(); }
  get dropdownGames$() { return this._dropdownGames.asObservable() }
  get selectedGame$() { return this._selectedGame.asObservable() }

  updateGames(page: number, list = 'latest') {
    return this.http.get<GameDetail[]>(`${this.baseUrl}/games?page=${page}&list=${list}`).pipe(
      tap(games => {
        this._games.next(games);
      }))
  }

  updateGame(id: string) {
    return this.http.get<GameDetail>(`${this.baseUrl}/games/${id}`).pipe(tap(game => {
      this._game.next(game);
    }));
  }

  filterDropdownGames(filter: string, updateStateGames = true) {
    if (filter == this._lastDropdownFilter.getValue()) {
      return this._dropdownGames.asObservable();
    }
    this._lastDropdownFilter.next(filter);
    return this.loadGames(filter, updateStateGames)
  }

  loadGames(filter: string, updateStateGames: boolean) {
    return this.http.get<GameDetail[]>(`${this.baseUrl}/games?search=${filter}`).pipe(tap(games => {
      if ('totem'.includes(filter.toLowerCase())) {
        games.unshift({
          id: 'totem',
          general: {
            name: 'Totem',
            genre: ['Canonical', 'View']
          },
          connections: {
            assetRenderer: environment.ASSET_RENDERER_URL
          },
          images: {
            smallThumbnail: 'assets/icons/nav/logo-small.svg'
          }
        })
      }
      if (updateStateGames) {
        this._dropdownGames.next(games);
      }
      return games;
    }));
  }

  clearGames() {
    this._games.next(null);
  }


  set gameInSession(game: GameDetail) {
    this.baseStorageService.setItem(this.uniqSessionKey, JSON.stringify(game), 'sesion');
    this.selectedGame = game;
  }

  get gameInSession(): GameDetail {
    const elSession = this.baseStorageService.getItem(this.uniqSessionKey, 'sesion');
    let game;
    if (elSession) {
      game = JSON.parse(elSession);
      this.selectedGame = game;
    }
    return game;
  }
}
