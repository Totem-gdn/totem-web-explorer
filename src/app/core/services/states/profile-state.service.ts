import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileStateService {

    private isOpened = new BehaviorSubject<boolean>(false);
    sidenavStatus: Observable<boolean> = this.isOpened.asObservable();

    constructor() {}

    updateLoadingStatus(data: boolean) {
        this.isOpened.next(data);
    }
}
