import { Injectable } from "@angular/core";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class WidgetService {
  private _selectedGame = new BehaviorSubject<GameDetail | null>(null);

  constructor() {}

  get selectedGame() {
    return this._selectedGame.getValue();
  }
  get selectedGame$() {
    return this._selectedGame.asObservable();
  }

  updateSelectedGame(game: GameDetail) {
    this._selectedGame.next(game);
  }

}
