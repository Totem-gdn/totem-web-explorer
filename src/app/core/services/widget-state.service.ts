import { Injectable } from "@angular/core";
import { Game } from "@app/modules/landing/components/common-components/totem-search-filter/models/items-interface.model";
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({providedIn: 'root'})

export class WidgetService {
  private selectedGame$: Subject<Game> = new Subject<Game>();
  selectedGame: Observable<Game> = this.selectedGame$.asObservable();

  constructor() {}

  updateSelectedGame(game: Game) {
    this.selectedGame$.next(game);
  }

}
