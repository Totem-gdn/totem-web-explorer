import { Injectable } from "@angular/core";
import { TRANSACTION_TYPE } from "@app/core/models/enums/transaction-type.enum";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { Web3AuthService } from "@app/core/web3auth/web3auth.service";
import { BehaviorSubject } from "rxjs";
import Web3 from "web3";

@Injectable({providedIn: 'root'})

export class PopupService {
    constructor(private web3: Web3AuthService) {}

    private _showTokenTransaction = new BehaviorSubject<boolean>(false);
    private _showAssetTransaction = new BehaviorSubject<AssetInfo | null>(null);
    private _showLogoutPopup = new BehaviorSubject<boolean>(false);


    get assetTransaction$() { return this._showAssetTransaction.asObservable(); }
    showAssetTransaction(asset: AssetInfo) { this._showAssetTransaction.next(asset); }
    closeAssetTransaction() { this._showAssetTransaction.next(null)}

    get tokenTransaction$() { return this._showTokenTransaction.asObservable(); }
    showTokenTransaction() { this._showTokenTransaction.next(true); }
    closeTokenTransaction() { this._showTokenTransaction.next(false); }

    get logout$() { return this._showLogoutPopup.asObservable(); }
    showLogout() { this._showLogoutPopup.next(true); }
    closeLogout() { this._showLogoutPopup.next(false) }

}