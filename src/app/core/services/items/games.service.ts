import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class GamesService {

    private _games = new BehaviorSubject<any[]>([0,0,0,0,0,0,0,0,0,0,0,0]);


    get getGames() {
        return this._games.getValue();
    }
}