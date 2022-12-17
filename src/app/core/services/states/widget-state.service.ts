import { Injectable } from "@angular/core";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class WidgetService {
  private _selectedGame = new BehaviorSubject<GameDetail | null>(null);
  private _scriptIndex = new BehaviorSubject<number | undefined>(0);
  constructor() {}

  get selectedGame() {
    return this._selectedGame.getValue();
  }
  get selectedGame$() {
    return this._selectedGame.asObservable();
  }
  set selectedGame(game: GameDetail | null) {
    this._selectedGame.next(game);
  }

  get scriptIndex() { return this._scriptIndex.getValue() }
  get scriptIndex$() { return this._scriptIndex.asObservable(); }
  set scriptIndex(index: number | undefined) { this._scriptIndex.next(index) }



}
