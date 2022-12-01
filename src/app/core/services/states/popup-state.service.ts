import { Injectable } from "@angular/core";
import { AssetInfo } from "@app/core/models/interfaces/asset-info.model";
import { BehaviorSubject } from "rxjs";

@Injectable({ providedIn: 'root' })

export class PopupService {
    constructor() { }

    private _showTokenTransaction = new BehaviorSubject<boolean>(false);
    private _showAssetTransaction = new BehaviorSubject<AssetInfo | null>(null);
    private _showLogoutPopup = new BehaviorSubject<boolean>(false);
    private _showSidebarPopup = new BehaviorSubject<boolean>(false);
    private _showSmallSidebarPopup = new BehaviorSubject<boolean>(false);
    private _showSidebarFilterPopup = new BehaviorSubject<boolean>(false);


    get assetTransaction$() { return this._showAssetTransaction.asObservable(); }
    showAssetTransaction(asset: AssetInfo) { this._showAssetTransaction.next(asset); }
    closeAssetTransaction() { this._showAssetTransaction.next(null) }

    get tokenTransaction$() { return this._showTokenTransaction.asObservable(); }
    showTokenTransaction() { this._showTokenTransaction.next(true); }
    closeTokenTransaction() { this._showTokenTransaction.next(false); }

    get sidebar$() { return this._showSidebarPopup.asObservable(); }
    showSidebar() { this._showSidebarPopup.next(true); }
    closeSidebar() { this._showSidebarPopup.next(false) }

    get smallSidebar$() { return this._showSmallSidebarPopup.asObservable(); }
    showSmallSidebar() { this._showSmallSidebarPopup.next(true); }
    closeSmallSidebar() { this._showSmallSidebarPopup.next(false) }

    get sidebarFilter$() { return this._showSidebarFilterPopup.asObservable(); }
    showSidebarFilter() { this._showSidebarFilterPopup.next(true); }
    closeSidebarFilter() { this._showSidebarFilterPopup.next(false) }

    get logout$() { return this._showLogoutPopup.asObservable(); }
    showLogout() { this._showLogoutPopup.next(true); }
    closeLogout() { this._showLogoutPopup.next(false) }
}