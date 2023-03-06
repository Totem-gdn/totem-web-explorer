import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({providedIn: 'root'})

export class TotemHeaderService {

  private coverOpened: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  coverOpened$: Observable<boolean> = this.coverOpened.asObservable();

  constructor(
  ) {}

  setCoverState(state: boolean) {
    this.coverOpened.next(state);
  }

}
