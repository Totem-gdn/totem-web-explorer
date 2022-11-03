import { Injectable } from "@angular/core";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";

@Injectable({providedIn: 'root'})

export class PopupService {
    constructor(private web3: Web3AuthService) {}

    private _showTokenPopup = new BehaviorSubject<boolean>(false);
    private _showLogoutPopup = new BehaviorSubject<boolean>(false);

    showTokenPopup() {
        this._showTokenPopup.next(true);
    }
    showTokenPopup$() {
        return this._showTokenPopup.asObservable();
    }
    get showLogoutPopup$() {
        return this._showLogoutPopup.asObservable();
    }
    get showLogoutPopup() {
        return this._showLogoutPopup.getValue();
    }
    set showLogoutPopup(value: boolean) {
        this._showLogoutPopup.next(value);
    }



}