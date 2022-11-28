import { Injectable } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class PopupService {
    constructor() { }

    private _showTokenTransaction = new BehaviorSubject<boolean>(false);
    private _showAssetTransaction = new BehaviorSubject<AssetInfo | null>(null);
    private _showLogoutPopup = new BehaviorSubject<boolean>(false);


    get assetTransaction$() { return this._showAssetTransaction.asObservable(); }
    showAssetTransaction(asset: AssetInfo) { this._showAssetTransaction.next(asset); }
    closeAssetTransaction() { this._showAssetTransaction.next(null) }

    get tokenTransaction$() { return this._showTokenTransaction.asObservable(); }
    showTokenTransaction() { this._showTokenTransaction.next(true); }
    closeTokenTransaction() { this._showTokenTransaction.next(false); }

    get logout$() { return this._showLogoutPopup.asObservable(); }
    showLogout() { this._showLogoutPopup.next(true); }
    closeLogout() { this._showLogoutPopup.next(false) }

}