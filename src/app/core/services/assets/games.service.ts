import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ASSET_PARAM_LIST } from "@app/core/models/enums/params.enum";
import { ApiResponse, APIResponseMeta } from "@app/core/models/interfaces/api-response.interface";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { environment } from "@env/environment";
import { BehaviorSubject, debounce, debounceTime, from, map, Observable, of, shareReplay, tap } from "rxjs";
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

  private _totalGames = new BehaviorSubject<number | null>(null);
  get totalGames$() { return this._totalGames.asObservable() }

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

  fetchGames(page: number, list: 'latest' | 'popular' = 'latest', owner: string | undefined = undefined, released?: number) {
    const url = owner ? `${this.baseUrl}/games?page=${page}&list=${list}&owner=${owner}` : `${this.baseUrl}/games?page=${page}&list=${list}${released === 1 ? '&released=1' : released === 0 ? '&released=0' : ''}`;


    return this.http.get<ApiResponse<GameDetail[]>>(url)
      .pipe(map(games => {
        this._totalGames.next(games.meta.total);
        games.data.map((game: GameDetail) => {
          if (game.connections && game.connections?.assetRenderer) {
            let rendererFromGame: string = game.connections.assetRenderer;
            const rendererUrlChecked = rendererFromGame.slice(-1) === '/' ? rendererFromGame.slice(0, -1) : rendererFromGame;
            game.connections.assetRenderer = rendererUrlChecked;
          }
          return game;
        });
        return games;
      }));
  }

  gamesByFilter(filter: string, page: number = 1, list: 'latest' | 'popular' = 'latest'): Observable<any> {

    let url = '';
    if (filter) {
      url = `${this.baseUrl}/games/search?name=${filter}`;
    } else {
      url = `${this.baseUrl}/games`;
    }


    if (this.cacheService.lastFilter == filter) {
      return this.cacheService.cachedGames$;
    };
    this.cacheService.lastFilter = filter;

    return this.http.get<any>(url).pipe(
      map(games => {
        if(games.data) return games.data;
        return games;
      }),
      tap(games => {
        this.cacheService.cachedGames = games;
      })
    );
  }

  getGamesByFilter(filter: string, page: number = 1, list: 'latest' | 'popular' = 'latest') {
    const url = `${this.baseUrl}/games?search=${filter}&page=${page}&list=${list}`;

    return this.http.get<ApiResponse<GameDetail[]>>(url)
      .pipe(
        map(games => games.data)
      );
  }


  set gameInSession(game: GameDetail | null) {
    if(!game) return;
    this.baseStorageService.setItem(this.uniqSessionKey, JSON.stringify(game), 'local');
    this.selectedGame = game;
  }

  get gameInSession(): GameDetail | null {
    const elSession = this.baseStorageService.getItem(this.uniqSessionKey, 'local');
    let game;
    if(!elSession) {
      return         {
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
      }
    }
    if (elSession) {
      game = JSON.parse(elSession);
    }
    return game;
  }
}
