import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({providedIn: 'root'})

export class AdminStateService {

    private _isAdmin = new BehaviorSubject<boolean>(false);
    get isAdmin() { return this._isAdmin.getValue() }
}