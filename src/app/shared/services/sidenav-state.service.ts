import { Injectable } from '@angular/core';
import { SidebarState } from '@app/core/models/sidebar-type-interface.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavStateService {

    private isOpened = new BehaviorSubject<SidebarState>({isOpen: false, type: 'nav'});
    sidenavStatus: Observable<SidebarState> = this.isOpened.asObservable();

    constructor() {}

    updateLoadingStatus(data: SidebarState) {
        console.log(data);
        this.isOpened.next(data);
    }
}
