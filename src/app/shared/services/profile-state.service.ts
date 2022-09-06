import { Injectable } from '@angular/core';
import { SidebarState } from '@app/core/models/sidebar-type-interface.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileStateService {

    private isOpened = new BehaviorSubject<boolean>(false);
    sidenavStatus: Observable<boolean> = this.isOpened.asObservable();

    constructor() {}

    updateLoadingStatus(data: boolean) {
        console.log(data);
        this.isOpened.next(data);
    }
}
