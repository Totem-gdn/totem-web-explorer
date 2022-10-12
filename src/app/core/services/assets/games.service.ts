import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "@env/environment";
import { BehaviorSubject, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class GamesService {

    baseUrl: string = environment.TOTEM_BASE_API_URL;

    constructor(private http: HttpClient) {
    }

    private _games = new BehaviorSubject<any[] | null>(null);

    private _game = new BehaviorSubject<any[] | null>(null);

    get games() {
        return this._games.getValue();
    }
    set games(value: any) {
        this._games.next(value);
    }
    get $games() {
        return this._games.asObservable();
    }

    get game$() {
        return this._game.asObservable();
    }


    fetchGames(wallet: string) {
        return this.http.get<any>(`https://simple-api.totem.gdn/default/gem/${wallet}`).pipe(
            // map(games => this.formatTime(games.data)),
            tap(games => {
                this.games = games;
            }))         
    }

    updateGame(id: string) {
        return this.http.get<any>(`${this.baseUrl}/games/${id}`).pipe(map(game => {
            this._game.next(game);
        }));
    }
    
}