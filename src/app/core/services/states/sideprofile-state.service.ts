import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideProfileStateService {

    private isOpened = new BehaviorSubject<boolean>(false);
    sideprofStatus: Observable<boolean> = this.isOpened.asObservable();

    constructor() {}

    updateState(data: boolean) {
        console.log(data);
        this.isOpened.next(data);
    }
}
