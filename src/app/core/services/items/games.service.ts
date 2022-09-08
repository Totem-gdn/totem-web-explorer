import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, map, tap } from "rxjs";

@Injectable({providedIn: 'root'})

export class GamesService {

    constructor(private http: HttpClient) {
    }

    private _games = new BehaviorSubject<any[] | null>(null);


    get games() {
        return this._games.getValue();
    }
    set games(value: any) {
        this._games.next(value);
    }
    get $games() {
        return this._games.asObservable();
    }

    fetchGames(wallet: string) {
        return this.http.get<any>(`https://simple-api.totem.gdn/default/gem/${wallet}`).pipe(
            map(games => this.formatTime(games.data)),
            tap(games => {
                this.games = games;
            }))         
    }

    formatTime(games: any[]) {
        const formattedItems: any[] = [];

        for(let game of games) {
            game.updatedAt = new Date(game.updatedAt).toLocaleDateString();
            formattedItems.push(game);
        }

        return formattedItems;
    }
}