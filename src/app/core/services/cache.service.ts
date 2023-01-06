import { Injectable } from "@angular/core";
import { BehaviorSubject, from, Observable, of } from "rxjs";
import { GameDetail } from "../models/interfaces/submit-game-interface.model";


@Injectable({ providedIn: 'root' })

export class CacheService {


    private _lastFilter = new BehaviorSubject<string | null>(null);
    set lastFilter(filter: string | null) { this._lastFilter.next(filter) }
    get lastFilter() { return this._lastFilter.getValue() }

    private _cachedGames = new BehaviorSubject<GameDetail[] | null>(null);
    set cachedGames(filter: GameDetail[] | null) { this._cachedGames.next(filter) }
    get cachedGames$() {
        console.log('get cached games')
        // return this._cachedGames.asObservable()
        return this._cachedGames.asObservable();
        // return new Observable<GameDetail[] | null>(obs => {
        //     console.log(this.cachedGames)
        //     obs.next(this.cachedGames);
        // });
    }
    get cachedGames() { return this._cachedGames.getValue() }
}