import { Injectable } from "@angular/core";
import { TRANSACTION_TYPE } from "@app/core/models/enums/transaction-type.enum";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";

@Injectable({providedIn: 'root'})

export class PopupService {
    constructor(private web3: Web3AuthService) {}

    private _showTransactionPopup = new BehaviorSubject<string | null>(null);
    private _showLogoutPopup = new BehaviorSubject<boolean>(false);

    showTransactionPopup(type: string | null) {
        this._showTransactionPopup.next(type);
    }
    showTransactionPopup$() {
        return this._showTransactionPopup.asObservable();
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