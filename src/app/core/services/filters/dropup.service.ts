import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";


@Injectable({providedIn: 'root'})

export class ProfileService {

    private isDropupOpen = new BehaviorSubject<boolean>(false);

    set dropupOpen(isOpen: boolean) {
        this.isDropupOpen.next(isOpen);
    }

    get dropupOpen() {
        return this.isDropupOpen.getValue();
    }

    get dropupOpen$() {
        return this.isDropupOpen.asObservable();
    }
}