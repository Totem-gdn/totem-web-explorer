import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavStateService {

    private isOpened = new BehaviorSubject(false);
    sidenavStatus: Observable<boolean> = this.isOpened.asObservable();

    constructor() {}

    updateLoadingStatus(flag: boolean) {
      console.log(flag);

        this.isOpened.next(flag);
    }
}
