import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class TokenTransactionService {

    private _showPopup = new BehaviorSubject<boolean>(false);

    showPopup() {
        this._showPopup.next(true);
    }
    showPopup$() {
        return this._showPopup.asObservable();
    }
}