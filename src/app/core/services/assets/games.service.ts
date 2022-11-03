import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, of, take, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class GamesService {

    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient) {
    }

    private _games = new BehaviorSubject<any[] | null>(null);
    private _game = new BehaviorSubject<any | null>(null);
    private _dropdownGames = new BehaviorSubject<any | null>(null);
    private _selectedGame = new BehaviorSubject<any | null>(null);

    private _lastDropdownFilter = new BehaviorSubject<any | null>(null);

    get games() { return this._games.getValue(); }
    get dropdownGames() { return this._dropdownGames.getValue() }

    set setGames(value: any[]) { this._games.next(value); }
    set setGame(value: any) { this._game.next(value); }
    set selectedGame(value: any) { this._selectedGame.next(value); }

    get games$() { return this._games.asObservable(); }
    get game$() { return this._game.asObservable(); }
    get dropdownGames$() { return this._dropdownGames.asObservable() }
    get selectedGame$() { return this._selectedGame.asObservable() }

    updateGames(page: number, list = 'latest') {
        return this.http.get<any>(`${this.baseUrl}/games?page=${page}&list=${list}`).pipe(
            tap(games => {
                this._games.next(games);
            }))
    }

    updateGame(id: string) {
        return this.http.get<any>(`${this.baseUrl}/games/${id}`).pipe(tap(game => {
            this._game.next(game);
        }));
    }

    filterDropdownGames(filter: string) {
        if(filter == this._lastDropdownFilter.getValue()) return of(this._dropdownGames.getValue());
        this._lastDropdownFilter.next(filter);
        
        return this.http.get<any>(`${this.baseUrl}/games?search=${filter}`).pipe(tap(games => {
          if ('totem'.includes(filter.toLowerCase())) {
            games.unshift({
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

            this._dropdownGames.next(games);
        }));
    }

    clearGames() {
        this._games.next(null);
    }
}
