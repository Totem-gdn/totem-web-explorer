import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ASSET_PARAM_LIST, GAME_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { ApiResponse } from "@app/core/models/interfaces/api-response.interface";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { environment } from "@env/environment";
import { BehaviorSubject, debounce, debounceTime, map, Observable, shareReplay, tap } from "rxjs";
import { CacheService } from "../cache.service";
import { BaseStorageService } from "../utils/base-storage.service";

@Injectable({ providedIn: 'root' })

export class GamesService {

  baseUrl: string = environment.TOTEM_BASE_API_URL;
  private uniqSessionKey = 'gamesDropdown';

  constructor(
    private http: HttpClient,
    private baseStorageService: BaseStorageService,
    private cacheService: CacheService
  ) {
  }

  // private _dropdownGames = new BehaviorSubject<GameDetail[] | null>(null);
  // get dropdownGames() { return this._dropdownGames.getValue() }
  // get dropdownGames$() { return this._dropdownGames.asObservable() }

  private _selectedGame = new BehaviorSubject<GameDetail | null>(null);
  get selectedGame$() { return this._selectedGame.asObservable() }
  set selectedGame(value: GameDetail) {
    if (value) {
      this._selectedGame.next(value);
    }
  }


  fetchGame(id: string | number) {
    return this.http.get<GameDetail>(`${this.baseUrl}/games/${id}`);
  }

  fetchGames(page: number, list: GAME_PARAM_LIST = GAME_PARAM_LIST.LATEST, owner: string | undefined = undefined) {
    const url = owner ? `${this.baseUrl}/games?page=${page}&list=${list}&owner=${owner}` : `${this.baseUrl}/games?page=${page}&list=${list}`;
  

    return this.http.get<GameDetail[]>(url).pipe();
  }

  gamesByFilter(filter: string): Observable<any> {

    let url = '';
    if (filter) {
      url = `${this.baseUrl}/games/search?name=${filter}`;
    } else {
      url = `${this.baseUrl}/games`;
    }

    if (this.cacheService.lastFilter == filter) return this.cacheService.cachedGames$;
    this.cacheService.lastFilter = filter;

    return this.http.get<GameDetail[]>(url).pipe(
      tap(games => {
        this.cacheService.cachedGames = games;
      })
    );
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
