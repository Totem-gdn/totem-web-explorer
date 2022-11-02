import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, take, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class GamesService {

    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient) {
    }

    private _games = new BehaviorSubject<any[] | null>(null);
    private _game = new BehaviorSubject<any | null>(null);
    private _dropdownGames = new BehaviorSubject<any | null>(null);
    private _selectedGame = new BehaviorSubject<any | null>(null);

    get games() { return this._games.getValue(); }
    get dropdownGames() { return this._dropdownGames.getValue() }

    set setGames(value: any[]) { this._games.next(value); }
    set setGame(value: any) { this._game.next(value); }
    set selectedGame(value: any) { this._selectedGame.next(value); }

    get games$() { return this._games.asObservable(); }
    get game$() { return this._game.asObservable(); }
    get dropdownGames$() { return this._dropdownGames.asObservable() }
    get selectedGame$() { return this._selectedGame.asObservable() }

    updateGames(list = 'latest') {
        return this.http.get<any>(`${this.baseUrl}/games?list=${list}`).pipe(
            take(1),
            tap(games => {
                this.setGames = games;
            }))
    }

    updateGame(id: string) {
        return this.http.get<any>(`${this.baseUrl}/games/${id}`).pipe(tap(game => {
            this._game.next(game);
        }));
    }

    filterDropdownGames(filter: string) {
        return this.http.get<any>(`${this.baseUrl}/games?search=${filter}`).pipe(tap(games => {
          if ('totem'.includes(filter.toLowerCase())) {
            games.unshift({
              general: {
                name: 'Totem',
                genre: ['Canonical', 'View']
              },
              connections: {
                assetRenderer: 'https://asset-renderer.totem-explorer.com'
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
