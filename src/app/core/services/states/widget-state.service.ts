import { Injectable } from "@angular/core";
import { GameDetail } from "@app/core/models/interfaces/submit-game-interface.model";
import { Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class WidgetService {
  private selectedGame$: Subject<GameDetail> = new Subject<GameDetail>();
  selectedGame: Observable<GameDetail> = this.selectedGame$.asObservable();

  constructor() {}

  updateSelectedGame(game: GameDetail) {
    this.selectedGame$.next(game);
  }

}
