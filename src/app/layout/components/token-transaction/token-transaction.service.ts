import { Injectable } from "@angular/core";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";

@Injectable({providedIn: 'root'})

export class TokenTransactionService {
    constructor(private web3: Web3AuthService) {}

    private _showPopup = new BehaviorSubject<boolean>(false);

    showPopup() {
        this._showPopup.next(true);
    }
    showPopup$() {
        return this._showPopup.asObservable();
    }

    isAddressValid(address: string) {
        if(!this.web3.provider) return;
        const web3 = new Web3(this.web3.provider as any);
        const isValid = web3.utils.isAddress(address);
        console.log(isValid);
        return isValid;
    }
}