import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class ComboBoxService {
  private selectedGame$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  selectedGame: Observable<string> = this.selectedGame$.asObservable();

  constructor() {}

  updateSelectedGame(game: string) {
    this.selectedGame$.next(game);
  }

}
