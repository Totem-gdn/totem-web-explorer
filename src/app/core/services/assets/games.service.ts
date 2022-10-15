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

    get games() {
        return this._games.getValue();
    }
    set setGames(value: any[]) {
        this._games.next(value);
    }
    set setGame(value: any) {
        this._game.next(value);
    }

    get games$() {
        return this._games.asObservable();
    }
    get game$() {
        return this._game.asObservable();
    }


    fetchGames() {
        return this.http.get<any>(`${this.baseUrl}/games`).pipe(
            take(1),
            tap(games => {
                this.setGames = games;
            }))         
    }

    updateGame(id: string) {
        return this.http.get<any>(`${this.baseUrl}/games/${id}`).pipe(map(game => {
            this._game.next(game);
        }));
    }
    
}