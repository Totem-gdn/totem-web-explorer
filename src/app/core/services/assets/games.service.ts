import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ASSET_PARAM_LIST, GAME_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { ApiResponse } from "@app/core/models/interfaces/api-response.interface";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { environment } from "@env/environment";
import { BehaviorSubject, debounce, debounceTime, Observable, tap } from "rxjs";
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

  private _dropdownGames = new BehaviorSubject<GameDetail[] | null>(null);
  private _selectedGame = new BehaviorSubject<GameDetail | null>(null);

  private _lastDropdownFilter = new BehaviorSubject<string | null>(null);


  get dropdownGames() { return this._dropdownGames.getValue() }
  get dropdownGames$() { return this._dropdownGames.asObservable() }

  get selectedGame$() { return this._selectedGame.asObservable() }
  set selectedGame(value: GameDetail) {
    if (value) {
      this._selectedGame.next(value);
    }
  }

  fetchGame(id: string | number) {
    return this.http.get<GameDetail>(`${this.baseUrl}/games/${id}`);
  }

  fetchGames(page: number, list: GAME_PARAM_LIST = GAME_PARAM_LIST.LATEST) {
    return this.http.get<GameDetail[]>(`${this.baseUrl}/games?page=${page}&list=${list}`);
  }

  getGamesByFilter(filter: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/games/search?name=${filter}`);
  }

  filterDropdownGames(filter: string, updateStateGames = true) {
    if (filter == this._lastDropdownFilter.getValue()) {
      return this._dropdownGames.asObservable();
    }
    this._lastDropdownFilter.next(filter);
    return this.loadGames(filter, updateStateGames)
  }

  loadGames(filter: string, updateStateGames: boolean) {
    return this.http.get<GameDetail[]>(`${this.baseUrl}/games/search?name=${filter}`).pipe(tap(res => {
      let games = res;
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
